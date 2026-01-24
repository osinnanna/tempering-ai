import type { OpenRouterProvider } from "@openrouter/ai-sdk-provider";
import { createHackclubClient } from "./src/client";
import {
  promptForApiKey,
  prompt,
  generateMasterPrompt,
  inferMasterPrompt,
  testApiKey,
} from "./src/onboard/initialization";

// Get apikey from haclub user
const apiKey = promptForApiKey();

const hackclubClient = createHackclubClient(apiKey);
const isValidKey = await testApiKey(apiKey, hackclubClient);

if (!isValidKey) throw new Error("There was an error with your api key");

console.log("Your Key is valid. Welcome to Tempering");

// Getting intent
async function runSession(client: OpenRouterProvider) {
  const intent = await prompt();

  const response = await generateMasterPrompt(intent, client);
  console.log("Creating master prompt");
  console.log(response + "\n\n");

  if (typeof response === "string") {
    console.log("Infering from master prompt");
    const inference = await inferMasterPrompt(response, client);
    console.log(inference);
  } else {
    console.error("Response is undefined or not a string.");
  }
}

await runSession(hackclubClient);