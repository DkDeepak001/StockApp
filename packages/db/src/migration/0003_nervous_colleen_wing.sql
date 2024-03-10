CREATE TABLE IF NOT EXISTS "userIntrests" (
	"id" uuid,
	"tagId" uuid,
	CONSTRAINT "userIntrests_tagId_id_pk" PRIMARY KEY("tagId","id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userIntrests" ADD CONSTRAINT "userIntrests_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userIntrests" ADD CONSTRAINT "userIntrests_tagId_hashTag_id_fk" FOREIGN KEY ("tagId") REFERENCES "hashTag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
