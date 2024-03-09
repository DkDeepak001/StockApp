import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';


import {
  users,
  posts,
  reactions,
  postRelations,
  reactionsType,
  usersRelations,
  reactionsRelations,
  hashTag,
  postToHashTag,
  hashTagRelation,
  postToHashTagRelation,
  comments,
  commentsRelations
} from './schema/schema';

export const schema = {
  users,
  posts,
  reactions,
  postRelations,
  reactionsType,
  usersRelations,
  hashTag,
  reactionsRelations,
  postToHashTag,
  postToHashTagRelation,
  hashTagRelation,
  comments,
  commentsRelations
}
const sql = neon(process.env.DB_URL!);
export const db = drizzle(sql);


