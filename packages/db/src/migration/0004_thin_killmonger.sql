DO $$ BEGIN
 ALTER TABLE "postToHashTag" ADD CONSTRAINT "postToHashTag_tagId_hashTag_id_fk" FOREIGN KEY ("tagId") REFERENCES "hashTag"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
