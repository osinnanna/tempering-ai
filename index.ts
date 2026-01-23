import { OpenRouter } from "@openrouter/sdk";
import client from "./src/client";


const response = await client.chat.send({
    model: "qwen/qwen3-32b",
    messages: [
        {
            role: "user",
            content: "Tell me a joke",
        }
    ],
    stream: false,
});

console.log(response.choices[0]?.message.content);