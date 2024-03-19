import { db, schema } from "@stockHub/db";
import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";

type ExtendedApiRequest = Omit<NextApiRequest, 'body'> & {
  body: {
    postId: string,
    hashtag: { uuids: string, parsedText: string }[]
  }[]
};

export default async function handler(
  req: ExtendedApiRequest,
  res: NextApiResponse,
) {
  //@ts-ignore
  const data: ExtendedApiRequest['body'] = JSON.parse(req.body);
  data?.map((d) => {
    //looping hashtag 
    d.hashtag.map(async (t) => {
      //checl if tag is there
      const hasTag = await db.query.hashTag.findFirst({
        where: eq(schema.hashTag.id, t.uuids)
      })

      //if not create new tag connect the relations
      if (!hasTag) {
        await db.insert(schema.hashTag).values({
          id: t.uuids,
          name: t.parsedText
        })
      }
      // And connect the postToHashTag Realtion
      const res = await db.insert(schema.postToHashTag).values({
        postId: d.postId,
        hashTagId: t.uuids
      })
      console.log(res)
    })
  })


  return res.status(200).json({ name: '' });
}

