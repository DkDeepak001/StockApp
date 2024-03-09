DO $$ BEGIN
 CREATE TYPE "reactionsType" AS ENUM('like', 'dislikes');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hashTag" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	CONSTRAINT "hashTag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "postToHashTag" (
	"postId" uuid,
	"tagId" uuid,
	CONSTRAINT "postToHashTag_tagId_postId_pk" PRIMARY KEY("tagId","postId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"tittle" varchar(256) NOT NULL,
	"authorId" text NOT NULL,
	"description" text,
	"likes" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reactions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"reactionsType" "reactionsType",
	"postId" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "users_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postToHashTag" ADD CONSTRAINT "postToHashTag_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postToHashTag" ADD CONSTRAINT "postToHashTag_tagId_hashTag_id_fk" FOREIGN KEY ("tagId") REFERENCES "hashTag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
