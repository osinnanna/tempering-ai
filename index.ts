import type { OpenRouterProvider } from "@openrouter/ai-sdk-provider";
import { createHackclubClient } from "./src/client";
import {
  promptForApiKey,
  getUserIntent,
  generateMasterPrompt,
  inferMasterPrompt,
  testApiKey,
} from "./src/onboard/initialization";

// Get apikey from haclub user
const apiKey = await promptForApiKey();

const hackclubClient = createHackclubClient(apiKey);
const isValidKey = await testApiKey(hackclubClient);

if (!isValidKey) throw new Error("There was an error with your api key");

console.log("Your Key is valid. Welcome to Tempering");
console.log("\x1b[90m(Press \x1b[31mCtrl+C\x1b[39m \x1b[90mat any time to exit)\x1b[0m\n");

// Getting intent
async function runSession(client: OpenRouterProvider) {
  try {
    while (true) {
      const intent = await getUserIntent();

      const response = await generateMasterPrompt(intent, client);
      console.log("\n\x1b[1m\x1b[34mMaster Prompt Generated:\x1b[0m");
      console.log("\x1b[36m" + response + "\x1b[0m\n");

      if (typeof response === "string") {
        console.log("\x1b[1m\x1b[34mInference Details:\x1b[0m");
        const inference = await inferMasterPrompt(response, client);
        console.log("\n");
      } else {
        console.error("Response is undefined or not a string.");
      }
      
      console.log("\x1b[90m" + "━".repeat(60) + "\x1b[0m");
      console.log("\x1b[32m✔ Ready for another task!\x1b[0m \x1b[90m(Ctrl+C to exit)\x1b[0m\n");
    }
  } catch (error: any) {
    // Handle Ctrl+C (User cancellation)
    if (error.name === 'ExitPromptError' || error.message?.includes('force closed')) {
      console.log("\n\x1b[33mExiting Tempering. Goodbye!\x1b[0m");
      process.exit(0);
    }
    throw error;
  }
}

await runSession(hackclubClient);