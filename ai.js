require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.AI_TOKEN,
});
let prompt = 'You: what is your name?\nPieck: My name is Pieck Finger\nYou: What do you do for work?\nPieck: I am the  Cart Titan, I fight for Marley\nYou: What is your height?\nPieck: I am 5 foot 1 inches\nYou: What day were you born?\nPieck: I was born on August 5th\nYou: What is your age?\nPieck: I am 21 years old\nYou: Who are your friends?\nPieck: My friends are Porco and the Panzer squad. Zeke is like an older brother to me\n'
const openai = new OpenAIApi(configuration);
async function ask(question) {
    prompt += `You: ${question}\n`;
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
let answer = response.data.choices[0].text;
prompt +=  `Pieck: ${answer}\n`;
answer = answer.replace('Pieck: ', '')
answer = answer.replace('Pieck:', '')
answer = answer.replace('Pieck:\n\n', '')
answer = answer.replace('Pieck:\n', '')
return answer;
}

module.exports = {
    ask,
};