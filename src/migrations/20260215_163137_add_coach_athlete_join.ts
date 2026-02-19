import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_coach_athlete_status" AS ENUM('pending', 'active', 'ended');
  CREATE TABLE "coach_athlete" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"coach_id" integer NOT NULL,
  	"athlete_id" integer NOT NULL,
  	"status" "enum_coach_athlete_status",
  	"start_date" timestamp(3) with time zone,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "coach_athlete_id" integer;
  ALTER TABLE "coach_athlete" ADD CONSTRAINT "coach_athlete_coach_id_users_id_fk" FOREIGN KEY ("coach_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "coach_athlete" ADD CONSTRAINT "coach_athlete_athlete_id_users_id_fk" FOREIGN KEY ("athlete_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "coach_athlete_coach_idx" ON "coach_athlete" USING btree ("coach_id");
  CREATE INDEX "coach_athlete_athlete_idx" ON "coach_athlete" USING btree ("athlete_id");
  CREATE INDEX "coach_athlete_updated_at_idx" ON "coach_athlete" USING btree ("updated_at");
  CREATE INDEX "coach_athlete_created_at_idx" ON "coach_athlete" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_coach_athlete_fk" FOREIGN KEY ("coach_athlete_id") REFERENCES "public"."coach_athlete"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_coach_athlete_id_idx" ON "payload_locked_documents_rels" USING btree ("coach_athlete_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "coach_athlete" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "coach_athlete" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_coach_athlete_fk";
  
  DROP INDEX "payload_locked_documents_rels_coach_athlete_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "coach_athlete_id";
  DROP TYPE "public"."enum_coach_athlete_status";`)
}
