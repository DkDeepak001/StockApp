CREATE TABLE IF NOT EXISTS "file" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"url" text NOT NULL,
	"filePath" text NOT NULL,
	"height" text,
	"weight" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "file_url_unique" UNIQUE("url")
);
