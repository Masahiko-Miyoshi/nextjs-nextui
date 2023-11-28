const { Configuration, OpenAIApi,OpenAI } = require("openai");
import type { NextApiRequest, NextApiResponse } from 'next';

export type GPTMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};
//オリジナルのコード
// const configuration = new Configuration({
  
//    apiKey: process.env.OPENAI_API_KEY,

// });


const openai = new OpenAI(process.env.OPENAI_API_KEY);
// const openai = new OpenAIApi(configuration);ｓ



/* オリジナルのコード
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chat = req.body.chat;
  const response = await sendMessage(chat);
  res.status(200).json({ message: response.choices[0].message.content, usage: response.usage});
}


export const sendMessage = async (chat: GPTMessage[]) => {

  const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  // model: "gpt-4-0613",
  temperature:0.7, // Default:0.7 
  max_tokens:1000,
  messages: chat,
});
// const ret_str = completion.data.choices[0].message.content;
const ret_obj = completion.data;  //2023/5/8 data部をごっそり返す total_tokensを参照するため
return ret_obj;
};
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chat = req.body.chat;
  const response = await sendMessage(chat);
  res.status(200).json({ message: response.choices[0].message.content, usage: response.usage});
}


export const sendMessage = async (chat: GPTMessage[]) => {
const completion =await openai.chat.completions.create({
// const completion = await openai.createChatCompletion({
  // model: "gpt-3.5-turbo",
  // model: "gpt-4-0613",
  // model: "ft:gpt-3.5-turbo-0613:otsukaelectronics::82uX5IJs",
  model: "gpt-4-1106-preview",

  temperature:0.7, // Default:0.7 
  max_tokens:1000,
  messages: chat,
});
// const ret_str = completion.data.choices[0].message.content;
const ret_obj = completion;  //2023/5/8 data部をごっそり返す total_tokensを参照するため
return ret_obj;
};

