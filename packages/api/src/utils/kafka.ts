import { Kafka } from "@upstash/kafka"

const kafka = new Kafka({
  url: process.env.KAFKA_URL!,
  username: process.env.KAFKA_USERNAME!,
  password: process.env.KAFKA_PASSWORD!,
})

const p = kafka.producer()

export type SendHashTagParam = {
  data: {
    postId: string
    description: string
  }
}

export const sendHashTag = async ({ data }: SendHashTagParam) => {
  return await p.produce("hashtag", data)
}

