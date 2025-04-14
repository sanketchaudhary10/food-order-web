-- CreateTable
CREATE TABLE "OrderLog" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "toppingNames" TEXT NOT NULL,
    "encryptedEmail" TEXT NOT NULL,
    "encryptedName" TEXT NOT NULL,
    CONSTRAINT "OrderLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "OrderLog_userId_idx" ON "OrderLog"("userId");
