const { Configuration, OpenAIApi } = require("openai");
import type { NextApiRequest, NextApiResponse } from 'next';

export type GPTMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,

});
const openai = new OpenAIApi(configuration);

/*
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const chat = req.body.chat;
    const response = await sendMessage(chat);
    res.status(200).json({ message: response });
  }

export const sendMessage = async (chat: string) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    // model: "gpt-4",
    temperature:0.7, // Default:0.7 
    max_tokens:1000,
    messages: [{ role: "system", content: "あなたは優秀なアシスタントです。" },{ role: "user", content: chat }],
  });
  const ret_str = completion.data.choices[0].message.content;
  return ret_str;
};
*/

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const chat = req.body.chat;
  const response = await sendMessage(chat);
  res.status(200).json({ message: response.choices[0].message.content, usage: response.usage});
}


export const sendMessage = async (chat: GPTMessage[]) => {
const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  // model: "gpt-4",
  temperature:0.7, // Default:0.7 
  max_tokens:1000,
  messages: chat,
});
// const ret_str = completion.data.choices[0].message.content;
const ret_obj = completion.data;  //2023/5/8 data部をごっそり返す total_tokensを参照するため
return ret_obj;
};


