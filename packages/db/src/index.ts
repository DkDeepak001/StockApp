import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';


import { users } from './schema/schema';

export const schema = { users }
const sql = neon(process.env.DB_URL!);
export const db = drizzle(sql);


