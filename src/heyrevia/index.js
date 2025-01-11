import OpenAI from 'openai';
import { PYTHON_BINDINGS_USER_PROMPT, OPENAI_MODEL_SYSTEM_PROMPT } from "./prompts/medsPrompts.js";

export const testGPT = async (apiKey, strInput, retryCount = 0) => {
  try {
    if (retryCount > 2) {
      console.error("Error: Max retries reached. Please try again later");
      return;
    }

    if (!apiKey) {
      console.error("Error: No API key provided. Please ensure you pass a valid OpenAI API key");
      return;
    }

    if(!strInput) {
      console.error("Error: String Input is required");
      return;
    }

    console.log('String Input: ', strInput);

    const client = new OpenAI({ apiKey });

    const chatCompletion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 50,
      messages: [
        { role: "system", content: OPENAI_MODEL_SYSTEM_PROMPT },
        { role: "user", content: PYTHON_BINDINGS_USER_PROMPT },
      ],
    });

    const response = chatCompletion.data.choices[0].message.content.trim();
    console.log("Response from OpenAI: ", response);
  } catch (error) {
    if (error.response) {
      console.error("Status: ", error.response.status);
      console.error("Headers: ", error.response.headers);
    }

    if (error.response?.status === 429) {
      if (error.response?.status === 429) {
        console.log("Too many requests. Retrying in 5 seconds..");
        await new Promise(resolve => setTimeout(resolve, 5000));
        await testGPT(apiKey, retryCount + 1);
      } else {
        console.error("Error communicating with OpenAI: ", error.response?.data || error.message);
      }
    }
  }
}
