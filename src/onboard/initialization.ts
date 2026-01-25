import type { OpenRouterProvider } from "@openrouter/ai-sdk-provider";
import { generateText } from "ai";
import { createHackclubClient } from "../client";
import { password, input } from "@inquirer/prompts";

export async function promptForApiKey(): Promise<string> {
    const apiKey = await password({
        message: "Enter your Hackclub API key (get one at https://ai.hackclub.com):",
        mask: "*",
    });

    if (!apiKey || apiKey.trim().length === 0) {
        throw new Error("No API Key Provided");
    }
    return apiKey.trim();
}
export async function testApiKey(apiKey: string, client: OpenRouterProvider): Promise<boolean> {
    try {
        const hackclub = createHackclubClient(apiKey);
        const { text } = await generateText({
            model: client("quen/qwen3-32b"),
            prompt: "ping",
            maxOutputTokens: 1,
        });
        return typeof text === "string";
    } catch (error) {
        return false;
    }
}

export async function getUserIntent(): Promise<string> {
const response = await input({
    message: "Describe clearly what you would want from the AI-Agent in this session:",
    validate: (value) => value.trim().length > 0 || "Please enter your intent"
});

console.log(`You typed: ${response}`);
return response.trim();
}

export async function generateMasterPrompt(userIntent: string | null, client: OpenRouterProvider) {
    if (userIntent === null) return;
    const { text } = await generateText({
        model: client("qwen/qwen3-32b"),
        system: "You are a Meta-Prompt Engineer with decades of experience, You are crafting a master Promt even you will be made to use, be accurate and interprete causaulty very well. Your task is to turn the user intent into a Master System Prompt. Output ONLY the final system prompt. Do not include 'Sure here it is' or markdown formatting",
        prompt: `Create a professional persona based on this: ${userIntent}`,
    });
    return text;
}

export async function inferMasterPrompt(masterPrompt: string, client: OpenRouterProvider) {
    // take the masterprompt and infer what you will do from that and if the user confirms thats the role you'll take
    const { text } = await generateText({
        model: client("qwen/qwen3-32b"),
        system: "After finishing a prompt that you have created based on a users needs this master prompt break it down and essentially line by line explain what the master prompt will make you do and the things you'll be focusing on, various constrainst clearly so the user can understand",
        prompt: `Here is the masterprompt infer from it ${masterPrompt}`
    });
    return text;
}