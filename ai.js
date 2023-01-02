require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.AI_TOKEN,
});
let prompt = 'What have you been up to?\nWatching old movies.\nDid you watch anything interesting?\n'
const openai = new OpenAIApi(configuration);
async function ask(question) {
    prompt += `${question}\n`;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 256,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
    });
let answer = response.data.choices[0].text;
prompt +=  `${answer}\n`;
return answer;
}

module.exports = {
    ask,
};
