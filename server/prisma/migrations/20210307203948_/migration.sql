/*
  Warnings:

  - You are about to drop the column `short_post` on the `blogs` table. All the data in the column will be lost.
  - Added the required column `short_preview` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blogs" DROP COLUMN "short_post",
ADD COLUMN     "short_preview" TEXT NOT NULL;
