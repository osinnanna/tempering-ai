import { OpenRouter } from "@openrouter/sdk";

const client = new OpenRouter({
    apiKey: process.env.HACKCLUB_API_KEY,
    serverURL: process.env.HACKCLUB_URL,
});

export default client