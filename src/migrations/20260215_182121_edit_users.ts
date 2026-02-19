import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_profile_age" AS ENUM('Under 18', '18-24', '25-34', '35-44', '45-54', '55+');
  ALTER TABLE "users" ALTER COLUMN "profile_last_name" SET DATA TYPE varchar;
  ALTER TABLE "users" ALTER COLUMN "profile_age" SET DATA TYPE "public"."enum_users_profile_age" USING "profile_age"::"public"."enum_users_profile_age";
  ALTER TABLE "users" ADD COLUMN "coach_data_price" numeric NOT NULL;
  ALTER TABLE "users" DROP COLUMN "coach_data_client_count";
  ALTER TABLE "users" DROP COLUMN "coach_data_hourly_rate";
  DROP TYPE "public"."enum_users_profile_last_name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_profile_last_name" AS ENUM('Under 18', '18-24', '25-34', '35-44', '45-54', '55+');
  ALTER TABLE "users" ALTER COLUMN "profile_last_name" SET DATA TYPE "public"."enum_users_profile_last_name" USING "profile_last_name"::"public"."enum_users_profile_last_name";
  ALTER TABLE "users" ALTER COLUMN "profile_age" SET DATA TYPE numeric;
  ALTER TABLE "users" ADD COLUMN "coach_data_client_count" numeric DEFAULT 0;
  ALTER TABLE "users" ADD COLUMN "coach_data_hourly_rate" numeric;
  ALTER TABLE "users" DROP COLUMN "coach_data_price";
  DROP TYPE "public"."enum_users_profile_age";`)
}
