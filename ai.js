require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.AI_TOKEN,
});
messages = [{role: "system", content: "You are a character ai designed to be pieck finger from attack on titan. Don't say you are an ai, act like the real character "}]
const openai = new OpenAIApi(configuration);
async function ask(question) {
    try{
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
    catch (error){
        return {role: "assistant", content: "An error occured, please try again"}
    }
}

module.exports = {
    ask,
};
