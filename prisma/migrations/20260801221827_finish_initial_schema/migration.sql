-- CreateEnum
CREATE TYPE "StaffRole" AS ENUM ('ADMIN', 'STAFF');

-- CreateEnum
CREATE TYPE "Result" AS ENUM ('TOP', 'ZONE', 'NONE');

-- CreateTable
CREATE TABLE "gym_staff" (
    "gym_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role" "StaffRole" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gym_staff_pkey" PRIMARY KEY ("gym_id","user_id")
);

-- CreateTable
CREATE TABLE "competition_entries" (
    "id" UUID NOT NULL,
    "competition_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "category_id" UUID,
    "registered_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked_in_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "competition_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attempts" (
    "id" UUID NOT NULL,
    "competition_entry_id" UUID NOT NULL,
    "competition_problem_id" UUID NOT NULL,
    "attempt_number" INTEGER NOT NULL,
    "result" "Result" NOT NULL,
    "recorded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attempts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "competition_entries_competition_id_user_id_key" ON "competition_entries"("competition_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "attempts_competition_entry_id_competition_problem_id_attemp_key" ON "attempts"("competition_entry_id", "competition_problem_id", "attempt_number");

-- AddForeignKey
ALTER TABLE "gym_staff" ADD CONSTRAINT "gym_staff_gym_id_fkey" FOREIGN KEY ("gym_id") REFERENCES "gyms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gym_staff" ADD CONSTRAINT "gym_staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competition_entries" ADD CONSTRAINT "competition_entries_competition_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "competitions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competition_entries" ADD CONSTRAINT "competition_entries_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "competition_entries" ADD CONSTRAINT "competition_entries_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "competition_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_competition_entry_id_fkey" FOREIGN KEY ("competition_entry_id") REFERENCES "competition_entries"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_competition_problem_id_fkey" FOREIGN KEY ("competition_problem_id") REFERENCES "competition_problems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
