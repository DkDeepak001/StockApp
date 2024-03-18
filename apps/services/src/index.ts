import { Kafka } from "@upstash/kafka";
const kafka = new Kafka({
  url: process.env.KAFKA_URL!,
  username: process.env.KAFKA_USERNAME!,
  password: process.env.KAFKA_PASSWORD!,
});

const c = kafka.consumer();

const apiUrl = 'http://localhost:3000/api/hashtag'

async function main() {
  try {
    const messages = await c.consume({
      consumerGroupId: "group_1",
      instanceId: "instance_1",
      topics: ["hashtag"],
      autoOffsetReset: "earliest",
    });
    console.log("Recived messages", messages)

    let parsedResults: parsedResultType[] = [];
    const mentionRegEx = /\(([-0-9a-fA-F]+)\)/g;

    messages.forEach(message => {
      const { postId, description } = JSON.parse(message.value) as messageType['data'];
      const parsedText: string[] = [];
      let match;
      while ((match = mentionRegEx.exec(description)) !== null) {
        parsedText.push(match[1]);
      }
      parsedResults.push({ postId, uuid: parsedText });
    });

    if (parsedResults.length >= 1) {
      console.log("sending")
      await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(parsedResults)
      })
    }
  } catch (error) {
    console.log(error);
  }
}

// Call main function initially
main();

// Call main function every minute
setInterval(main, 6000); // 60000 milliseconds = 1 minute

type parsedResultType = {
  postId: string,
  uuid: string[]
}
type messageType = {
  data: {
    postId: string
    description: string
  }
}

