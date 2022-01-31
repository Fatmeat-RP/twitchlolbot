// add reference to the TMI library
const TMI = require('tmi.js');
// Bot Name and Password
const BOT_NAME = "HelloBot";
const TMI_OAUTH = "<tmi oauth token here>";
const TMI_OPTIONS = {
  identity: {
    username: BOT_NAME,
    password: TMI_OAUTH
  },
  channels: [
    "<some channel name>"
  ]
}
// Connect bot to channels and get client instance
const client = new TMI.client(TMI_OPTIONS);
client.on('connected', onConnectedHandler);
client.on('message', onMessageHandler);
client.connect();
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
// Called every time a message is typed in a chat that the bot is connected to
function onMessageHandler(target, tags, message, self){
    // Just leave this function if the message is from self
    if(self){ return;}
  
    let trimmedMessage = message.trim();
    let splitMessage = trimmedMessage.split(" ");
    let targetUser = "";
    if(splitMessage.length > 1){
        targetUser = splitMessage[1];
    }
    let greetingMessage = `Hey there @${targetUser}! I'm super excited you are here today! Tell the class how you're doin'`;
    let hiResponse = `What's up @${tags.username}?! Thanks for joining, it's always a good time :D`;
    
    // log every message, remove this eventually, for debugging only
    console.log(target, tags.username, trimmedMessage);
  
    if(splitMessage[0] === "Hi"){
      client.say(target, hiResponse);
    } else if(splitMessage[0] === "!greet"){
      client.say(target, greetMessage);
    }
  }
