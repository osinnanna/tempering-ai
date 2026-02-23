import type { OpenRouterProvider } from "@openrouter/ai-sdk-provider";
import { generateText, streamText } from "ai";
import { password, input } from "@inquirer/prompts";
import ora from "ora";

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
export async function testApiKey(client: OpenRouterProvider): Promise<boolean> {
    try {
        const { text } = await generateText({
            model: client("qwen/qwen3-32b"),
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
    message: "Describe clearly what you would want from the AI-Agent:",
    validate: (value) => value.trim().length > 0 || "Please enter your intent"
});

console.log(`\nYou typed: ${response}`);
return response.trim();
}

export async function generateMasterPrompt(userIntent: string | null, client: OpenRouterProvider) {
    if (userIntent === null) return;
    const spinner = ora("Your Master Prompt is loading....").start();
    try {
        const { text } = await generateText({
            model: client("qwen/qwen3-32b"),
            system: "You are a Meta-Prompt Engineer with decades of experience, You are crafting a master Promt even you will be made to use, be accurate and interprete causaulity very well(cause and effect of each natural language intent). Your task is to turn the user intent into a Master System Prompt. Output ONLY the final system prompt. Do not include 'Sure here it is' or markdown formatting, Only reply in English",
            prompt: `Create a professional persona based on this: ${userIntent}`,
        });
        spinner.succeed("Successful");
        return text;
    } catch (error) {
        throw new Error("There was an issue when making the request");
    }
}

export async function inferMasterPrompt(masterPrompt: string, client: OpenRouterProvider) {
    const spinner = ora("Your response is loading...").start();
    try {
        const { textStream } = await streamText({
            model: client("google/gemini-3-flash-preview"),
            system: "After finishing a prompt that you have created based on a users needs this master prompt break it down and essentially line by line explain what the master prompt will make you do and the things you'll be focusing on, various constrainst clearly so the user can understand",
            prompt: `Here is the masterprompt infer from it ${masterPrompt}`
        });
        
        let completeResponse = "";
        for await (const char of textStream) {
            process.stdout.write(char);
            completeResponse += char;
        }
        spinner.succeed("Done");
        return completeResponse;
    } catch (error) {
        ora().fail("Failed to get response");
        throw new Error("There was an issue when making the request");
    }
}