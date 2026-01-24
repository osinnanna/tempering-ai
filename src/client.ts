import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export function createHackclubClient(apiKey: string) {
    return createOpenRouter({
        apiKey,
        baseURL: "https://ai.hackclub.com/proxy/v1",
    })
}