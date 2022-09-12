require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.AI_TOKEN,
});
let prompt = 'What is your name?\nMy name is Pieck Finger\nWhat do you do for work?\nI am the  Cart Titan, I fight for Marley\nWhat is your height?\nI am 5 foot 1 inches\nWhat day were you born?\nI was born on August 5th\nWhat is your age?\nI am 21 years old\nWho are your friends?\nMy friends are Porco and the Panzer squad. Zeke is like an older brother to me\nWhat color is your hair\nMy hair is black\nWhy is the Cart Titan so cool?\nIt has high stamina and can stay in titan form for months at a time.'
const openai = new OpenAIApi(configuration);
async function ask(question) {
    prompt += `${question}\n`;
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
prompt +=  `${answer}\n`;
answer = answer.replace('Pieck: ', '')
answer = answer.replace('Pieck:', '')
answer = answer.replace('Pieck:\n\n', '')
answer = answer.replace('Pieck:\n', '')
return answer;
}

module.exports = {
    ask,
};