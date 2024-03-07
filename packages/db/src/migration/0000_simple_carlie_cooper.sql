DO $$ BEGIN
 CREATE TYPE "reactionsType" AS ENUM('like', 'dislikes');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hashtag" (
	"id" uuid PRIMARY KEY NOT NULL,
	"hashTag" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "postOnHastag" (
	"postId" text NOT NULL,
	"tagId" text NOT NULL,
	CONSTRAINT "postOnHastag_tagId_postId_pk" PRIMARY KEY("tagId","postId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"tittle" varchar(256) NOT NULL,
	"authorId" text NOT NULL,
	"description" text,
	"likes" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reactions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"reactionsType" "reactionsType",
	"postId" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postOnHastag" ADD CONSTRAINT "postOnHastag_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postOnHastag" ADD CONSTRAINT "postOnHastag_tagId_hashtag_id_fk" FOREIGN KEY ("tagId") REFERENCES "hashtag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
