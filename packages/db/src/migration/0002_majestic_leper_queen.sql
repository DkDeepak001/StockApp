CREATE TABLE IF NOT EXISTS "comments" (
	"id" uuid PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"postId" uuid NOT NULL,
	"userId" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "reactions" ADD COLUMN "userId" text NOT NULL;