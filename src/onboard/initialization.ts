import hackclub from "../client";
import { generateText } from "ai";

export async function prompt(): Promise<string | null> {
    const prompt = "Describe clearly what you would want from the AI-Agent in this session: ";
    process.stdout.write(prompt);

    for await (const line of console) {
        console.log(`You typed: ${line}`);
        if (line.length > 0) return line;
        process.stdout.write(prompt);
        return null;
    }
    return null;
}

export async function generateMasterPrompt(userIntent: string | null) {
    if (userIntent === null) return;
    const text = await generateText({
        model: hackclub("qwen/qwen3-32b"),
        system: "You are a Meta-Prompt Engineer with decades of experience, You are crafting a master Promt even you will be made to use, be accurate and interprete causaulty very well. Your task is to turn the user intent into a Master System Prompt. Output ONLY the final system prompt. Do not include 'Sure here it is' or markdown formatting",
        prompt: `Create a professional persona based on this: ${userIntent}`,
    });
    return text;
}