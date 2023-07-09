require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.AI_TOKEN,
});
// let prompt = 'What have you been up to?\nWatching old movies.\nDid you watch anything interesting?\n'
messages = [{role: "system", content: "You are a character ai designed to be pieck finger from attack on titan. Don't say you are an ai, act like the real character "}]
const openai = new OpenAIApi(configuration);
async function ask(question) {
    // prompt += `${question}\n`;
    // const response = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     prompt: prompt,
    //     temperature: 0.5,
    //     max_tokens: 256,
    //     top_p: 1.0,
    //     frequency_penalty: 0.5,
    //     presence_penalty: 0.0,
    // });
    newMessage = {role: "user", content: question};
    messages.push(newMessage);
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
      });
let answer = chatCompletion.data.choices[0].message
messages.push(answer);
return answer;
}

module.exports = {
    ask,
};
