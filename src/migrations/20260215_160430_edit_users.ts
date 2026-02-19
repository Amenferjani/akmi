import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_profile_last_name" AS ENUM('Under 18', '18-24', '25-34', '35-44', '45-54', '55+');
  ALTER TABLE "users" ALTER COLUMN "profile_last_name" SET DATA TYPE "public"."enum_users_profile_last_name" USING "profile_last_name"::"public"."enum_users_profile_last_name";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ALTER COLUMN "profile_last_name" SET DATA TYPE varchar;
  DROP TYPE "public"."enum_users_profile_last_name";`)
}
