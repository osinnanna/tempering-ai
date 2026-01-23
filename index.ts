import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
    apiKey: process.env.HACKCLUB_API_KEY,
    serverURL: process.env.HACKCLUB_URL,
});

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