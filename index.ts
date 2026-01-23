import { prompt, generateMasterPrompt } from "./src/onboard/initialization";

const intent = await prompt();

const response = await generateMasterPrompt(intent);
console.log(response);