import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const hackclub = createOpenRouter({
    apiKey: process.env.HACKCLUB_API_KEY,
    baseURL: "https://ai.hackclub.com/proxy/v1",
});

export default hackclub