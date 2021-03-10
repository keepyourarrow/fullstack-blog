/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[token]` on the table `VerifificationToken`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VerifificationToken.token_unique" ON "VerifificationToken"("token");
