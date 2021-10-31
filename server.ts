require('dotenv').config();
const {Client, Intents} = require('discord.js');
const cron = require('cron');
const {doesJackpotExceedLimits} = require('./scraper');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once('ready', () => {
  console.log(`Online as ${client.user.tag}`);

  let scheduledMessage = new cron.CronJob('00 30 20 * * *', async () => {
    const lotto = await doesJackpotExceedLimits(
      'https://www.national-lottery.co.uk/games/euromillions',
    );
    const guild = client.guilds.cache.get('id');
    const channel = guild.channels.cache.get('id');
    if (lotto) {
      channel.send('Euromillions is over £100 mill!');
    } else {
      channel.send("Euromillions is shit, don't bother");
    }
  });
  scheduledMessage.start();
});

client.login(process.env.CLIENT_TOKEN);
