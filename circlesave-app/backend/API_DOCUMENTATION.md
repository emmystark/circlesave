# CircleSave API Documentation

## Authentication

All circle endpoints require authentication via JWT token in the `Authorization` header:
```
Authorization: <your_jwt_token>
```

## Endpoints

### Auth Endpoints

#### POST `/auth/register`
Register with email and password
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

#### POST `/auth/login`
Login with email and password
```json
{
  "username": "user@example.com",
  "password": "password123"
}
```

#### GET `/auth/getAuthUrl`
Get Google OAuth URL

#### GET `/auth/oauth2callback`
Google OAuth callback (handled automatically)

#### PUT `/auth/wallet`
Update user's wallet address (requires auth)
```json
{
  "walletAddress": "0x123..."
}
```

---

### Circle Endpoints

#### POST `/circles`
**Create/Sync Circle** - Sync a circle created on-chain to database

**Flow:**
1. User inputs: `name` and `durationDays` (number of days for the cycle)
2. Frontend: User signs transaction to create circle on-chain with name and durationDays
3. Frontend: Calls this endpoint to sync to database

**Request:**
```json
{
  "onChainId": "1",
  "name": "My Savings Circle",
  "durationDays": 30,
  "transactionHash": "0xabc..." // optional
}
```

**Note:** The backend verifies the circle exists on-chain and uses the chain data as the source of truth for timestamps.

**Response:**
```json
{
  "message": "Circle created successfully",
  "circle": {
    "id": 1,
    "onChainId": "1",
    "name": "My Savings Circle",
    "startCycle": "1704067200",
    "endCycle": "1706659200",
    "status": 0,
    "totalBalance": "0"
  }
}
```

---

#### GET `/circles`
**Get User's Circles** - Get all circles user is part of (as creator or contributor)

**Query Params:**
- `status` (optional): Filter by status (0=Active, 1=Ended, 2=Closed/History)

**Response:**
```json
{
  "circles": [
    {
      "id": 1,
      "onChainId": "1",
      "name": "My Savings Circle",
      "creator": {
        "id": 1,
        "username": "user@example.com",
        "name": "John Doe",
        "walletAddress": "0x123..." // Only shown if you're the creator
      },
      "startCycle": "1704067200",
      "endCycle": "1706659200",
      "status": 0,
      "totalBalance": "1000000",
      "contributorCount": 5,
      "isCreator": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

**Privacy:** Individual contribution amounts are NOT shown to other users.

---

#### GET `/circles/history`
**Get Past Circles** - Get all closed/history circles (status = 2)

**Response:** Same format as GET `/circles`

---

#### GET `/circles/:id`
**Get Circle Details** - Get detailed information about a specific circle

**Response:**
```json
{
  "id": 1,
  "onChainId": "1",
  "name": "My Savings Circle",
  "creator": {
    "id": 1,
    "username": "user@example.com",
    "name": "John Doe",
    "walletAddress": "0x123..." // Only shown if you're the creator
  },
  "startCycle": "1704067200",
  "endCycle": "1706659200",
  "status": 0,
  "totalBalance": "1000000",
  "contributors": [
    {
      "id": 1,
      "username": "user@example.com",
      "name": "John Doe",
      "walletAddress": "0x123...", // Only shown if it's you
      "balance": "500000", // Only shown if it's you
      "lastContributionAt": "2024-01-15T00:00:00Z",
      "joinedAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "username": "other@example.com",
      "name": "Jane Doe",
      "walletAddress": null, // Hidden from other users
      "balance": null, // Hidden from other users
      "lastContributionAt": "2024-01-10T00:00:00Z",
      "joinedAt": "2024-01-05T00:00:00Z"
    }
  ],
  "contributorCount": 2,
  "isCreator": true,
  "userBalance": "500000", // Your own balance
  "createdAt": "2024-01-01T00:00:00Z"
}
```

**Privacy Features:**
- Users can see all members of the circle
- Users can see the total balance contributed by all members
- Users CANNOT see individual contribution amounts of other users
- Users can only see their own balance and wallet address

---

#### POST `/circles/:id/join`
**Join Circle** - Sync a deposit made on-chain to database

**Flow:**
1. Frontend: User signs transaction to deposit to circle on-chain
2. Frontend: Calls this endpoint to sync deposit to database

**Request:**
```json
{
  "walletAddress": "0x123...",
  "amount": "1000000",
  "transactionHash": "0xabc..." // optional
}
```

**Response:**
```json
{
  "message": "Successfully joined circle",
  "contributor": {
    "balance": "1000000",
    "lastContributionAt": "2024-01-15T00:00:00Z"
  },
  "vault": {
    "totalBalance": "1000000"
  }
}
```

**Notes:**
- If user doesn't have wallet address set, it will be updated automatically
- Verifies deposit exists on-chain before recording

---

#### POST `/circles/:id/withdraw`
**Withdraw from Circle** - Process withdrawal and move circle to history

**Flow:**
1. Frontend: User signs transaction to withdraw USDC on-chain
2. Frontend: Calls this endpoint to sync withdrawal to database
3. Circle status is automatically set to 2 (Closed/History)

**Request:**
```json
{
  "walletAddress": "0x123...",
  "amount": "500000",
  "transactionHash": "0xabc..." // optional
}
```

**Response:**
```json
{
  "message": "Withdrawal processed successfully",
  "withdrawal": {
    "id": 1,
    "amount": "500000",
    "status": "completed",
    "transactionHash": "0xabc..."
  },
  "circle": {
    "id": 1,
    "status": 2 // Now closed/history
  }
}
```

**Notes:**
- Only works after cycle has ended (`endCycle` timestamp)
- Checks user has sufficient balance
- Automatically marks circle as closed (status = 2) after withdrawal
- Circle moves to history and can be viewed via `/circles/history`

---

## Database Schema

### User
- `id`, `username`, `password`, `name`, `googleId`, `walletAddress`

### Circle
- `id`, `onChainId` (from smart contract), `name`, `creatorId`, `startCycle`, `endCycle`, `status` (0=Active, 1=Ended, 2=Closed)

### Vault
- `id`, `circleId`, `createdAt`, `totalBalance` (total of all contributions)

### CircleContributor
- `id`, `circleId`, `userId`, `walletAddress`, `balance`, `lastContributionAt`

### Withdrawal
- `id`, `circleId`, `userId`, `walletAddress`, `amount`, `status`, `transactionHash`, `completedAt`

---

## Privacy & Security

1. **Individual Balances Hidden**: Users cannot see how much other members contributed
2. **Total Balance Visible**: Everyone can see the total amount in the circle
3. **Members Visible**: Everyone can see who is in the circle
4. **Own Data Visible**: Users can always see their own balance and wallet address

---

## Status Codes

- `0` = Active (circle is ongoing)
- `1` = Ended (cycle ended but no withdrawals yet)
- `2` = Closed/History (withdrawal occurred, circle is in history)

---

## Environment Variables Required

```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
MODULE_ADDRESS=0x... (Aptos module address)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/oauth2callback
FRONTEND_URL=http://localhost:5173
PORT=3000
```

