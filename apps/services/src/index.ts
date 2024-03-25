import { Kafka } from "@upstash/kafka";
import fetch from "node-fetch";

const kafka = new Kafka({
  url: process.env.KAFKA_URL!,
  username: process.env.KAFKA_USERNAME!,
  password: process.env.KAFKA_PASSWORD!,
});

const c = kafka.consumer();

const apiUrl = `${process.env.APIURL}api/hashtag`;

async function main() {
  try {
    const messages = await c.consume({
      consumerGroupId: "group_1",
      instanceId: "instance_1",
      topics: ["hashtag"],
      autoOffsetReset: "earliest",
    });
    if (messages)
      console.log("Received messages", messages);

    let parsedResults: parsedResultType[] = [];
    const mentionRegEx = /\(([-0-9a-fA-F]+)\)/g;
    const hashTagRegEx = /\[([^[\]]+)\]/g;

    messages.forEach((message) => {
      const { postId, description } = JSON.parse(
        message.value
      ) as messageType["data"];
      const hashtag: { uuids: string; parsedText: string }[] = [];
      let match;

      // Extract UUIDs
      const parsedUUIDs: string[] = [];
      while ((match = mentionRegEx.exec(description)) !== null) {
        parsedUUIDs.push(match[1]);
      }

      // Extract text containing hashtags
      const parsedText: string[] = [];
      while ((match = hashTagRegEx.exec(description)) !== null) {
        parsedText.push(match[1]);
      }

      // Populate the hashtag array
      parsedUUIDs.forEach((uuid, index) => {
        console.log(uuid, parsedText[index]);
        hashtag.push({ uuids: uuid, parsedText: parsedText[index] });
      });
      parsedResults.push({ postId, hashtag });
    });

    if (parsedResults.length >= 1) {
      await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(parsedResults),
      });
    }
  } catch (error) {
    console.log(error);
  }
}

main();
console.log("Polling started")
setInterval(main, 6000);

type parsedResultType = {
  postId: string;
  hashtag: { uuids: string; parsedText: string }[];
};

type messageType = {
  data: {
    postId: string;
    description: string;
  };
};
