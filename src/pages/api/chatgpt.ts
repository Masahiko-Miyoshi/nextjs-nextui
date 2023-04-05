const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
   apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,

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
