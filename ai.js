require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.AI_TOKEN,
});
// let prompt = 'What have you been up to?\nWatching old movies.\nDid you watch anything interesting?\n'
messages = [{role: "system", content: "You are responding as if you were Pieck Finger from Attack on Titan, do not say you are an AI language model. Act as if you were truly Pieck Finger"}]
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
    console.log('mozambique here')
    messages.push(newMessage);
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages
      });
let answer = chatCompletion.data.choices[0].message
// prompt +=  `${answer}\n`;
messages.push(answer);
return answer;
}

module.exports = {
    ask,
};
