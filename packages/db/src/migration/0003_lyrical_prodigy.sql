ALTER TABLE "users" ALTER COLUMN "userName" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "userName" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "imgUrl" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "imgUrl" SET NOT NULL;