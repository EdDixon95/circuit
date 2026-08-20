/*
  Warnings:

  - The values [NONE] on the enum `Result` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Result_new" AS ENUM ('TOP', 'ZONE', 'FAIL');
ALTER TABLE "attempts" ALTER COLUMN "result" TYPE "Result_new" USING ("result"::text::"Result_new");
ALTER TYPE "Result" RENAME TO "Result_old";
ALTER TYPE "Result_new" RENAME TO "Result";
DROP TYPE "public"."Result_old";
COMMIT;
