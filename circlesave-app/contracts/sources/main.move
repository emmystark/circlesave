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

    struct ModuleData has key {
        signer_cap: SignerCapability,
    }

    #[event]
    struct CircleCreated has drop, store {
        circle_id: u64,
        creator: address,
        end_cycle: u64,
    }

    struct Circle has store {
        id: u64,
        name: String,
        creator: address,
        contributors: vector<address>,
        start_cycle: u64,
        end_cycle: u64,
        total_amount: u64,
        status: u8,
        distribution_index: u64,
        is_distribution_complete: bool,
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
        
        move_to(deployer, ModuleData { signer_cap: resource_signer_cap });
        
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
            total_amount: 0,
            status: 0, // 0 - ongoing, 1 - completed
            distribution_index: 0,
            is_distribution_complete: false,
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
        circle_id: u64,
        amount: u64
    ) acquires Registry {
        let user_addr = signer::address_of(user);
        let resource_addr = get_resource_account_address();
        let registry = borrow_global_mut<Registry>(resource_addr);
        
        assert!(table::contains(&registry.circles, circle_id), E_CIRCLE_NOT_FOUND);
        let circle = table::borrow_mut(&mut registry.circles, circle_id);
        let vault = table::borrow_mut(&mut registry.vaults, circle_id);
        

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
        circle.total_amount = circle.total_amount + amount;
    }

    public entry fun distribute_batch(
        circle_id: u64,
        batch_size: u64,
    ) acquires ModuleData, Registry {
        let resource_addr = get_resource_account_address();
        let module_data = borrow_global<ModuleData>(@circle_save_contracts);
        let resource_signer = account::create_signer_with_capability(&module_data.signer_cap);
        
        let registry = borrow_global_mut<Registry>(resource_addr);
        let circle = table::borrow_mut(&mut registry.circles, circle_id);
        let vault = table::borrow_mut(&mut registry.vaults, circle_id);
        
        let current_time = timestamp::now_seconds();
        assert!(current_time >= circle.end_cycle, E_CYCLE_NOT_ENDED);
        
        let total_contributors = vector::length(&circle.contributors);
        let start_index = circle.distribution_index;
        let end_index = if (start_index + batch_size > total_contributors) {
            total_contributors
        } else {
            start_index + batch_size
        };
        
        let i = start_index;
        while (i < end_index) {
            let contributor = *vector::borrow(&circle.contributors, i);
            
            if (table::contains(&vault.contributors_balance, contributor)) {
                let user_balance = *table::borrow(&vault.contributors_balance, contributor);
                
                if (user_balance > 0) {
                    coin::transfer<AptosCoin>(&resource_signer, contributor, user_balance);
                    vault.total_balance = vault.total_balance - user_balance;
                    
                    let balance_ref = table::borrow_mut(&mut vault.contributors_balance, contributor);
                    *balance_ref = 0;
                }
            };
            
            i = i + 1;
        };
        
        circle.distribution_index = end_index;
        
        if (end_index >= total_contributors) {
            circle.is_distribution_complete = true;
            circle.status = 2;
        }
    }
}