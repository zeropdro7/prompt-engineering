//import { testGPT } from './src/heyrevia/index.js';
import { removeHTMLTags } from './src/heyrevia/utils/removeHtml.js';
import dotenv from 'dotenv';
dotenv.config();

const HEYREVIA_PAYLOAD = process.env['HEYREVIA_PAYLOAD'];
//const OPENAI_API_KEY = process.env['OPENAI_API_KEY'];

const runParseHTML = () => {
  const cleanedStr = removeHTMLTags(HEYREVIA_PAYLOAD);
  console.log("Cleaned String:\n", cleanedStr);
  return cleanedStr;
}

/* const runTestGPT = async () => {
  if (!OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY is not defined. Please set it in your .env file.");
    return;
  }

  const strInput = runParseHTML();
  await testGPT(OPENAI_API_KEY, strInput);
}; */

const main = async () => {
  console.log("Starting the application...\n");
  // Test OpenAI Connection and Prompts' efficiency
  //await runTestGPT();

  // Remove HTML Tags from String Payload
  runParseHTML();
};

main();
