/*
  Warnings:

  - The `colour` column on the `competition_problems` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `category_id` on table `competition_entries` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ProblemColour" AS ENUM ('WHITE', 'BLACK', 'RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'PURPLE', 'PINK', 'BROWN');

-- DropForeignKey
ALTER TABLE "competition_entries" DROP CONSTRAINT "competition_entries_category_id_fkey";

-- AlterTable
ALTER TABLE "competition_entries" ALTER COLUMN "category_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "competition_problems" DROP COLUMN "colour",
ADD COLUMN     "colour" "ProblemColour";

-- AddForeignKey
ALTER TABLE "competition_entries" ADD CONSTRAINT "competition_entries_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "competition_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
