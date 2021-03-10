/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[user_id]` on the table `VerifificationToken`. If there are existing duplicate values, the migration will fail.
  - Added the required column `token` to the `VerifificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerifificationToken" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VerifificationToken_user_id_unique" ON "VerifificationToken"("user_id");
