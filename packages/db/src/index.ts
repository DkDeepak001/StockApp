import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';


import * as schemas from './schema/schema';
import { createInsertSchema } from 'drizzle-zod';

export const schema = schemas
const sql = neon(process.env.DB_URL!);
export const db = drizzle(sql, { schema: schemas });


export const vailadationType = {
  insertReaction: createInsertSchema(schema.reactions),
  insertComment: createInsertSchema(schema.comments)
}


