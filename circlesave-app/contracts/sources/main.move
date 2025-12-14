module circle_save_contracts::main {
    use std::vector;
    use std::string::String;
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;
    use aptos_framework::account::{Self, SignerCapability}; 
    use aptos_std::table::{Self, Table};
    use aptos_framework::timestamp;
    use aptos_framework::event;

    const E_NOT_AUTHORIZED: u64 = 1;
    const E_INSUFFICIENT_BALANCE: u64 = 2;
    const E_CIRCLE_NOT_FOUND: u64 = 3;
    const E_CYCLE_NOT_ENDED: u64 = 4;
    const E_WITHDRAWAL_FAILED: u64 = 5;

    struct ModuleData has key {
        signer_cap: SignerCapability,
        admin: address,  // Your backend address for off-chain operations
    }

    #[event]
    struct CircleCreated has drop, store {
        circle_id: u64,
        creator: address,
        end_cycle: u64,
    }

    #[event]
    struct DepositRecorded has drop, store {
        circle_id: u64,
        user: address,
        vault_balance: u64,
    }

    #[event]
    struct WithdrawalRequested has drop, store {
        circle_id: u64,
        user: address,
        amount: u64,
        withdrawal_type: u8,  // 1 = USDC, 2 = Fiat
    }

    struct Circle has store {
        id: u64,
        name: String,
        creator: address,
        contributors: vector<address>,
        start_cycle: u64,
        end_cycle: u64,
        status: u8,  // 0 = Active, 1 = Ended, 2 = Closed
    }

    struct Vault has store {
        id: u64,
        created_at: u64,
        total_balance: u64,
        contributors_balance: Table<address, u64>,
    }

    struct Registry has key {
        circles: Table<u64, Circle>,
        vaults: Table<u64, Vault>,
        counter: u64,
    }

    fun init_module(deployer: &signer) {
        let (resource_signer, resource_signer_cap) = account::create_resource_account(
            deployer, 
            b"circle_save_seed"
        );
        
        move_to(deployer, ModuleData { 
            signer_cap: resource_signer_cap,
            admin: signer::address_of(deployer),
        });
        
        move_to(&resource_signer, Registry {
            circles: table::new(),
            vaults: table::new(),
            counter: 0,
        });
    }

    fun get_resource_account_address(): address {
        account::create_resource_address(&@circle_save_contracts, b"circle_save_seed")
    }

    public entry fun create_circle(
        creator: &signer,
        circle_name: String,
        end_cycle_days: u64
    ) acquires Registry {
        let resource_addr = get_resource_account_address();
        let registry = borrow_global_mut<Registry>(resource_addr);
        let time = timestamp::now_seconds();
        let reg_id = registry.counter;
        
        let day_in_seconds: u64 = 86400;
        let cycle_duration: u64 = end_cycle_days * day_in_seconds;
        let end_time: u64 = time + cycle_duration;
        
        let vault = Vault {
            id: reg_id,
            created_at: time,
            total_balance: 0,
            contributors_balance: table::new(),
        };
        
        let circle = Circle {
            id: reg_id,
            name: circle_name,
            creator: signer::address_of(creator),
            contributors: vector::empty(),
            start_cycle: time,
            end_cycle: end_time,
            status: 0,
        };
        
        table::add(&mut registry.vaults, reg_id, vault);
        table::add(&mut registry.circles, reg_id, circle);

        event::emit(CircleCreated {
            circle_id: reg_id,
            creator: signer::address_of(creator),
            end_cycle: end_time,
        });
        
        registry.counter = registry.counter + 1;
    }


    public entry fun deposit_to_circle(
        user: &signer,
        circles_id: u64,
        amount: u64
    ) acquires Registry {
        let user_addr = signer::address_of(user);
        let resource_addr = get_resource_account_address();
        let registry = borrow_global_mut<Registry>(resource_addr);
        
        assert!(table::contains(&registry.circles, circles_id), E_CIRCLE_NOT_FOUND);
        let circle = table::borrow_mut(&mut registry.circles, circles_id);
        let vault = table::borrow_mut(&mut registry.vaults, circles_id);

        
        let usdc_balance = coin::balance<AptosCoin>(user_addr);
        assert!(usdc_balance >= amount, E_INSUFFICIENT_BALANCE);
        
        coin::transfer<AptosCoin>(user, resource_addr, amount);
    
        if (table::contains(&vault.contributors_balance, user_addr)) {
            let balance = table::borrow_mut(&mut vault.contributors_balance, user_addr);
            *balance = *balance + amount;
        } else {
            table::add(&mut vault.contributors_balance, user_addr, amount);
            vector::push_back(&mut circle.contributors, user_addr);
        };

        vault.total_balance = vault.total_balance + amount;

         event::emit(DepositRecorded {
            circle_id: circles_id,
            user: user_addr,
            vault_balance: vault.total_balance,
        });
    }

    // Withdraw as USDC to user's wallet
    public entry fun withdraw_as_usdc(
        user: &signer,
        circles_id: u64,
        amount: u64,
    ) acquires ModuleData, Registry {
        let user_addr = signer::address_of(user);
        let resource_addr = get_resource_account_address();
        
        let module_data = borrow_global<ModuleData>(@circle_save_contracts);
        let resource_signer = account::create_signer_with_capability(&module_data.signer_cap);
        
        let registry = borrow_global_mut<Registry>(resource_addr);
        
        assert!(table::contains(&registry.circles, circles_id), E_CIRCLE_NOT_FOUND);
        let circle = table::borrow_mut(&mut registry.circles, circles_id);
        let vault = table::borrow_mut(&mut registry.vaults, circles_id);
        
        // Check cycle ended
        let current_time = timestamp::now_seconds();
        assert!(current_time >= circle.end_cycle, E_CYCLE_NOT_ENDED);
        
        // Check user has balance
        assert!(table::contains(&vault.contributors_balance, user_addr), E_NOT_AUTHORIZED);
        let user_balance = table::borrow_mut(&mut vault.contributors_balance, user_addr);
        assert!(*user_balance >= amount, E_INSUFFICIENT_BALANCE);
        
        // Update balances
        *user_balance = *user_balance - amount;
        vault.total_balance = vault.total_balance - amount;
        
        // Transfer REAL USDC from resource account to user
        coin::transfer<AptosCoin>(&resource_signer, user_addr, amount);

        event::emit(WithdrawalRequested {
            circle_id: circles_id,
            user: user_addr,
            amount: *user_balance,
            withdrawal_type: 1,  // USDC
        });
    }

    // This is called AFTER your backend successfully transfers via Monnify
    public entry fun confirm_fiat_withdrawal(
        admin: &signer,
        circles_id: u64,
        user_address: address,
        amount: u64,
    ) acquires ModuleData, Registry {
        // Verify caller is admin (backend)
        let module_data = borrow_global<ModuleData>(@circle_save_contracts);
        assert!(signer::address_of(admin) == module_data.admin, E_NOT_AUTHORIZED);
        
        let resource_addr = get_resource_account_address();
        let registry = borrow_global_mut<Registry>(resource_addr);
        
        assert!(table::contains(&registry.circles, circles_id), E_CIRCLE_NOT_FOUND);
        let circle = table::borrow_mut(&mut registry.circles, circles_id);
        let vault = table::borrow_mut(&mut registry.vaults, circles_id);
        
        // Check cycle ended
        let current_time = timestamp::now_seconds();
        assert!(current_time >= circle.end_cycle, E_CYCLE_NOT_ENDED);
        
        // Check user has balance
        assert!(table::contains(&vault.contributors_balance, user_address), E_NOT_AUTHORIZED);
        let user_balance = table::borrow_mut(&mut vault.contributors_balance, user_address);
        assert!(*user_balance >= amount, E_INSUFFICIENT_BALANCE);
        
        // Update balances (NO USDC transfer, already sent via Monnify)
        *user_balance = *user_balance - amount;
        vault.total_balance = vault.total_balance - amount;

        event::emit(WithdrawalRequested {
            circle_id: circles_id,
            user: user_address,
            amount: *user_balance,
            withdrawal_type: 2,  // Fiat
        });
    }

    #[view]
    public fun get_user_balance(circle_id: u64, user_address: address): u64 acquires Registry {
        let resource_addr = get_resource_account_address();
        let registry = borrow_global<Registry>(resource_addr);
        let vault = table::borrow(&registry.vaults, circle_id);
        
        if (table::contains(&vault.contributors_balance, user_address)) {
            *table::borrow(&vault.contributors_balance, user_address)
        } else {
            0
        }
    }

    #[view]
    public fun get_circle_info(circle_id: u64): (String, address, u64, u64, u64, u8) acquires Registry {
        let resource_addr = get_resource_account_address();
        let registry = borrow_global<Registry>(resource_addr);
        let circle = table::borrow(&registry.circles, circle_id);
        let vault = table::borrow(&registry.vaults, circle_id);

        (circle.name, circle.creator, circle.start_cycle, circle.end_cycle, vault.total_balance, circle.status)
    }
}