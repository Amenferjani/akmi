import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "exercises" DROP CONSTRAINT "exercises_demo_video_id_media_id_fk";
  
  DROP INDEX "exercises_demo_video_idx";
  ALTER TABLE "exercises" ADD COLUMN "demo_video_url" varchar;
  ALTER TABLE "exercises" DROP COLUMN "demo_video_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "exercises" ADD COLUMN "demo_video_id" integer;
  ALTER TABLE "exercises" ADD CONSTRAINT "exercises_demo_video_id_media_id_fk" FOREIGN KEY ("demo_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "exercises_demo_video_idx" ON "exercises" USING btree ("demo_video_id");
  ALTER TABLE "exercises" DROP COLUMN "demo_video_url";`)
}
