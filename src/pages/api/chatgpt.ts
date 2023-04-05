const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
   //apiKey: process.env.OPENAI_API_KEY,
  apiKey:'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',
});
const openai = new OpenAIApi(configuration);

export const sendMessage = async (chat: string) => {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: "あなたは優秀なコンサルタントです。" },{ role: "user", content: chat }],
  });
  const ret_str = completion.data.choices[0].message.content;
  return ret_str;
};

/*
const API_URL = 'https://api.openai.com/v1/engines/text-davinci-002/completions';
export async function sendMessage(message: string): Promise<string> {
  try{
  const response = await axios.post(
    API_URL,
    {
      prompt: message,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.5,
      engine: 'text-davinci-002', // これを追加
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        //Authorization: `Bearer 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`,
      },
    }
  );

  return response.data.choices[0].text.trim();
}
catch (error) {
    console.error('API request failed:', error.response.data);
    throw error;
}
}
*/


