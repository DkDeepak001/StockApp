import { Kafka } from "@upstash/kafka"

const kafka = new Kafka({
  url: process.env.KAFKA_URL!,
  username: process.env.KAFKA_USERNAME!,
  password: process.env.KAFKA_PASSWORD!,
})

const c = kafka.consumer()

async function main() {
  try {

    const messages = await c.consume({
      consumerGroupId: "group_1",
      instanceId: "instance_1",
      topics: ["hashtag"],
      autoOffsetReset: "earliest",
    })
    console.log(messages)
  } catch (error) {
    console.log(error)
  }
}
main()


