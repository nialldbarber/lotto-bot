require('dotenv').config();
const {Client, Intents} = require('discord.js');
const cron = require('cron');
const {doesJackpotExceedLimits} = require('./scraper');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let interval;
client.on('message', async (msg: any) => {
  const lotto = await doesJackpotExceedLimits(
    'https://www.national-lottery.co.uk/games/euromillions',
  );

  interval = setInterval(function () {
    if (lotto) {
      msg.channel.send('Euromillions is over £100 mill!');
    } else {
      msg.channel.send("Euromillions is shit, don't bother");
    }
  }, 10000); //every hour
});

client.login(process.env.CLIENT_TOKEN);
