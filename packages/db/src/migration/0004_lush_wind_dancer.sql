ALTER TABLE "userIntrests" RENAME COLUMN "id" TO "userId";--> statement-breakpoint
ALTER TABLE "userIntrests" DROP CONSTRAINT "userIntrests_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "userIntrests" DROP CONSTRAINT "userIntrests_tagId_id_pk";--> statement-breakpoint
ALTER TABLE "userIntrests" ADD CONSTRAINT "userIntrests_tagId_userId_pk" PRIMARY KEY("tagId","userId");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userIntrests" ADD CONSTRAINT "userIntrests_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
