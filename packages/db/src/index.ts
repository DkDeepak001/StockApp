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
  commentsRelations,
  files,
  filesRelation,
  userToHashTag,
  userToHashTagRelation
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
  commentsRelations,
  userToHashTagRelation,
  userToHashTag,
  filesRelation,
  files

}
const sql = neon(process.env.DB_URL!);
export const db = drizzle(sql);


