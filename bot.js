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
try{
    client.on("message", async (message) => {
        if (message.author.bot) return;
        if (message.content.includes("!setup")) {
            if(!message.guild.channels.cache.find(channel => channel.name === 'pieckbot-chat')){
            message.guild.channels.create('pieckbot-chat')
        }
        }
        if (message.content.includes("!ignore")) {
            
        }
        if (message.channel.name != 'pieckbot-chat') return;
        const prompt = message.content;
        let answer = await ask(prompt);
        answer = String(answer.content)
        if (answer.length < 8000 && answer.length >= 6000){
            let answer1 = answer.substring(0,1999);
            let answer2 = answer.substring(1999,3999)
            let answer3 = answer.substring(3999,5999)
            let answer4 = answer.substring(5999,7999)
            message.channel.send(answer1)
            message.channel.send(answer2)
            message.channel.send(answer3)
            message.channel.send(answer4)
        }
        else if (answer.length < 6000 && answer.length >= 4000){
            let answer1 = answer.substring(0,1999);
            let answer2 = answer.substring(1999,3999)
            let answer3 = answer.substring(3999,5999)
            message.channel.send(answer1)
            message.channel.send(answer2)
            message.channel.send(answer3)
        }
        else if (answer.length < 4000 && answer.length >= 2000){
            let answer1 = answer.substring(0,1999);
            let answer2 = answer.substring(1999)
            message.channel.send(answer1)
            message.channel.send(answer2)
        }
        else{
            message.channel.send(answer);
        }
    });
}
catch(err){
    
}
client.login(process.env.BOT_TOKEN);
