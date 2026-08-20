/*
  Warnings:

  - You are about to drop the column `attempt_number` on the `attempts` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "attempts_competition_entry_id_competition_problem_id_attemp_key";

-- AlterTable
ALTER TABLE "attempts" DROP COLUMN "attempt_number";

-- CreateIndex
CREATE INDEX "attempts_competition_entry_id_competition_problem_id_idx" ON "attempts"("competition_entry_id", "competition_problem_id");
