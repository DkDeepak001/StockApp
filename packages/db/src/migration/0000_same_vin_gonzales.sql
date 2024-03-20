DO $$ BEGIN
 CREATE TYPE "reactionsType" AS ENUM('like', 'dislikes');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" text PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"postId" text NOT NULL,
	"userId" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "file" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"filePath" text NOT NULL,
	"postId" text,
	"height" integer DEFAULT 0,
	"weight" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "file_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "following" (
	"id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hashTag" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "hashTag_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "postToHashTag" (
	"postId" text,
	"tagId" text,
	CONSTRAINT "postToHashTag_tagId_postId_pk" PRIMARY KEY("tagId","postId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" text PRIMARY KEY NOT NULL,
	"tittle" varchar(256) NOT NULL,
	"authorId" text NOT NULL,
	"description" text,
	"likes" integer DEFAULT 0,
	"dislikes" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reactions" (
	"id" text PRIMARY KEY NOT NULL,
	"reactionsType" "reactionsType",
	"postId" text NOT NULL,
	"userId" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userIntrests" (
	"userId" text,
	"tagId" text,
	CONSTRAINT "userIntrests_tagId_userId_pk" PRIMARY KEY("tagId","userId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text,
	"userId" text PRIMARY KEY NOT NULL,
	"userName" text NOT NULL,
	"fistName" text,
	"lastName" text,
	"imgUrl" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "users_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "following_id_id_index" ON "following" ("id","id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "reactions_postId_userId_index" ON "reactions" ("postId","userId");--> statement-breakpoint
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userIntrests" ADD CONSTRAINT "userIntrests_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userIntrests" ADD CONSTRAINT "userIntrests_tagId_hashTag_id_fk" FOREIGN KEY ("tagId") REFERENCES "hashTag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
