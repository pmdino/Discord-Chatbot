require('dotenv').config()
const { ask } = require("./ai.js");
const token = process.env.BOT_TOKEN;
const {Client, Intents} = require("discord.js");
const { start } = require('repl');
const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES 
    ]
});
client.on("ready", () =>{
    console.log("The AI bot is online");
    client.user.setActivity("Type !setup to create chat channel");
});
client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.includes("!setup")) {
        if(!message.guild.channels.cache.find(channel => channel.name === 'bot-chat')){
         message.guild.channels.create('bot-chat')
       }
     }
     if (message.channel.name != 'bot-chat') return;
    const prompt = message.content;
    const answer = await ask(prompt);
    message.channel.send(answer);
});
client.login(process.env.BOT_TOKEN);
