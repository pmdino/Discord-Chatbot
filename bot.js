require('dotenv').config()
const { ask } = require("./ai.js"); //import the "ask" function from the "ai.js" file
const token = process.env.BOT_TOKEN; //Token that you saved in step 5 of this tutorial
const {Client, Intents} = require("discord.js");
const { start } = require('repl');
const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES 
    ]
});
client.on("ready", () =>{
    console.log("The AI bot is online"); //message when bot is online
});
client.on("message", async (message) => {
    if (message.author.bot) return;
        const prompt = message.content; //remove the exclamation mark from the message
        const answer = await ask(prompt); //prompt GPT-3
        message.channel.send(answer); //reply to Discord with answer from GPT-3
});
client.login(process.env.BOT_TOKEN);