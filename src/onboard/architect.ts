import client from "../client";

async function generateMasterPrompt(userIntent: string) {
    const response = await client.chat.send({
        model: "qwen/qwen3-32b",
        messages: [
            {
                role: "system",
                content: "You are a Meta-Prompt Engineer. Your task is to turn the user intent into a Master System Prompt. Output ONLY the final system prompt. Do not include 'Sure here it is' or markdown formatting"
            },
            {
                role: "user",
                content: `Create a professional persona based on this: ${userIntent}`
            }
        ],
    });
    return response.choices[0]?.message.content;
} 

const testIntent = "A senior security researcher who is extremely paranoid and speaks in short, cryptic warnings.";

console.log("Sending to OpenRouter...");

const masterPrompt = await generateMasterPrompt(testIntent);

console.log("\n--- GENERATED MASTER PROMPT ---");
console.log(masterPrompt);
console.log("-------------------------------\n");