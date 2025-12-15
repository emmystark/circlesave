-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "name" TEXT,
    "googleId" TEXT,
    "walletAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Circle" (
    "id" SERIAL NOT NULL,
    "onChainId" BIGINT,
    "name" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "startCycle" BIGINT NOT NULL,
    "endCycle" BIGINT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Circle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vault" (
    "id" SERIAL NOT NULL,
    "circleId" INTEGER NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "totalBalance" BIGINT NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vault_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CircleContributor" (
    "id" SERIAL NOT NULL,
    "circleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "balance" BIGINT NOT NULL DEFAULT 0,
    "lastContributionAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CircleContributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Withdrawal" (
    "id" SERIAL NOT NULL,
    "circleId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "transactionHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Withdrawal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "User_walletAddress_key" ON "User"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Circle_onChainId_key" ON "Circle"("onChainId");

-- CreateIndex
CREATE UNIQUE INDEX "Vault_circleId_key" ON "Vault"("circleId");

-- CreateIndex
CREATE INDEX "CircleContributor_circleId_idx" ON "CircleContributor"("circleId");

-- CreateIndex
CREATE INDEX "CircleContributor_userId_idx" ON "CircleContributor"("userId");

-- CreateIndex
CREATE INDEX "CircleContributor_walletAddress_idx" ON "CircleContributor"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "CircleContributor_circleId_walletAddress_key" ON "CircleContributor"("circleId", "walletAddress");

-- CreateIndex
CREATE INDEX "Withdrawal_circleId_idx" ON "Withdrawal"("circleId");

-- CreateIndex
CREATE INDEX "Withdrawal_userId_idx" ON "Withdrawal"("userId");

-- CreateIndex
CREATE INDEX "Withdrawal_status_idx" ON "Withdrawal"("status");

-- CreateIndex
CREATE INDEX "Withdrawal_createdAt_idx" ON "Withdrawal"("createdAt");

-- AddForeignKey
ALTER TABLE "Circle" ADD CONSTRAINT "Circle_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vault" ADD CONSTRAINT "Vault_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircleContributor" ADD CONSTRAINT "CircleContributor_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircleContributor" ADD CONSTRAINT "CircleContributor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdrawal" ADD CONSTRAINT "Withdrawal_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdrawal" ADD CONSTRAINT "Withdrawal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
