ALTER TABLE "users" ADD COLUMN "firstName" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastName" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "imgUrl" text DEFAULT null;