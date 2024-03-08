CREATE TABLE IF NOT EXISTS "hashTag" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	CONSTRAINT "hashTag_name_unique" UNIQUE("name")
);
