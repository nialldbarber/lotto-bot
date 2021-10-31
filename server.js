require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.id}`);
});

client.login(process.env.CLIENT_TOKEN);
