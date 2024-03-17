import { Kafka } from "@upstash/kafka"

const kafka = new Kafka({
  url: process.env.KAFKA_URL!,
  username: process.env.KAFKA_USERNAME!,
  password: process.env.KAFKA_PASSWORD!,
})

const p = kafka.producer()

type SendHashTagParam = {
  data: {
    message: string
  }
}

export const sendHashTag = async ({ data }: SendHashTagParam) => {
  return await p.produce("hashtag", data)
}

