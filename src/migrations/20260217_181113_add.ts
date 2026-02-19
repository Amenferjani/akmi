import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_exercises_muscle_group" AS ENUM('Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body');
  CREATE TYPE "public"."enum_exercises_equipment" AS ENUM('Barbell', 'Dumbbell', 'Machine', 'Cable', 'Bodyweight', 'Other');
  CREATE TABLE "exercises" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"muscle_group" "enum_exercises_muscle_group" NOT NULL,
  	"equipment" "enum_exercises_equipment" NOT NULL,
  	"instructions" jsonb,
  	"demo_video_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "workouts_exercises_sets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"weight" numeric NOT NULL,
  	"reps" numeric NOT NULL,
  	"rpe" numeric
  );
  
  CREATE TABLE "workouts_exercises" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"exercise_id" integer NOT NULL,
  	"notes" varchar
  );
  
  CREATE TABLE "workouts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"total_volume" numeric,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "exercises_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "workouts_id" integer;
  ALTER TABLE "exercises" ADD CONSTRAINT "exercises_demo_video_id_media_id_fk" FOREIGN KEY ("demo_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workouts_exercises_sets" ADD CONSTRAINT "workouts_exercises_sets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workouts_exercises"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workouts_exercises" ADD CONSTRAINT "workouts_exercises_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "workouts_exercises" ADD CONSTRAINT "workouts_exercises_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."workouts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "exercises_demo_video_idx" ON "exercises" USING btree ("demo_video_id");
  CREATE INDEX "exercises_updated_at_idx" ON "exercises" USING btree ("updated_at");
  CREATE INDEX "exercises_created_at_idx" ON "exercises" USING btree ("created_at");
  CREATE INDEX "workouts_exercises_sets_order_idx" ON "workouts_exercises_sets" USING btree ("_order");
  CREATE INDEX "workouts_exercises_sets_parent_id_idx" ON "workouts_exercises_sets" USING btree ("_parent_id");
  CREATE INDEX "workouts_exercises_order_idx" ON "workouts_exercises" USING btree ("_order");
  CREATE INDEX "workouts_exercises_parent_id_idx" ON "workouts_exercises" USING btree ("_parent_id");
  CREATE INDEX "workouts_exercises_exercise_idx" ON "workouts_exercises" USING btree ("exercise_id");
  CREATE INDEX "workouts_user_idx" ON "workouts" USING btree ("user_id");
  CREATE INDEX "workouts_updated_at_idx" ON "workouts" USING btree ("updated_at");
  CREATE INDEX "workouts_created_at_idx" ON "workouts" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_exercises_fk" FOREIGN KEY ("exercises_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_workouts_fk" FOREIGN KEY ("workouts_id") REFERENCES "public"."workouts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_exercises_id_idx" ON "payload_locked_documents_rels" USING btree ("exercises_id");
  CREATE INDEX "payload_locked_documents_rels_workouts_id_idx" ON "payload_locked_documents_rels" USING btree ("workouts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "exercises" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "workouts_exercises_sets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "workouts_exercises" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "workouts" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "exercises" CASCADE;
  DROP TABLE "workouts_exercises_sets" CASCADE;
  DROP TABLE "workouts_exercises" CASCADE;
  DROP TABLE "workouts" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_exercises_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_workouts_fk";
  
  DROP INDEX "payload_locked_documents_rels_exercises_id_idx";
  DROP INDEX "payload_locked_documents_rels_workouts_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "exercises_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "workouts_id";
  DROP TYPE "public"."enum_exercises_muscle_group";
  DROP TYPE "public"."enum_exercises_equipment";`)
}
