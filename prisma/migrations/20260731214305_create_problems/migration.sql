/*
  Warnings:

  - You are about to drop the `competition_category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "competition_category" DROP CONSTRAINT "competition_category_competition_id_fkey";

-- DropTable
DROP TABLE "competition_category";

-- CreateTable
CREATE TABLE "competition_categories" (
    "id" UUID NOT NULL,
    "competition_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competition_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "competition_problems" (
    "id" UUID NOT NULL,
    "competition_id" UUID NOT NULL,
    "problem_number" INTEGER NOT NULL,
    "grade" TEXT,
    "colour" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competition_problems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "competition_categories_competition_id_name_key" ON "competition_categories"("competition_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "competition_problems_competition_id_problem_number_key" ON "competition_problems"("competition_id", "problem_number");

-- AddForeignKey
ALTER TABLE "competition_categories" ADD CONSTRAINT "competition_categories_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "competitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competition_problems" ADD CONSTRAINT "competition_problems_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "competitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
