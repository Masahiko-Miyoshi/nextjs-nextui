const { Configuration, OpenAIApi } = require("openai");
import type { NextApiRequest, NextApiResponse } from 'next';


const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,

});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const chat = req.body.chat;
    const response = await sendMessage(chat);
    res.status(200).json({ message: response });
  }
  
  

export const sendMessage = async (chat: string) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "あなたは優秀なコンサルタントです。" },{ role: "user", content: chat }],
  });
  const ret_str = completion.data.choices[0].message.content;
  return ret_str;
};

