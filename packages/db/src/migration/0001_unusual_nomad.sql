CREATE TABLE IF NOT EXISTS "reactions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"postId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "authorId" SET NOT NULL;