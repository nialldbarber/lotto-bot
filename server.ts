require('dotenv').config();
const {Client, Intents} = require('discord.js');
const cron = require('cron');
const {doesJackpotExceedLimits} = require('./scraper');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// let interval;
// client.on('ready', async (msg: any) => {
//   const lotto = await doesJackpotExceedLimits(
//     'https://www.national-lottery.co.uk/games/euromillions',
//   );

//   interval = setInterval(function () {
//     if (lotto) {
//       msg.channel.send('Euromillions is over £100 mill!');
//     } else {
//       msg.channel.send("Euromillions is shit, don't bother");
//     }
//   }, 10000); //every hour
// });

let interval: any;

client.on('message', async (msg: any) => {
  const lotto = await doesJackpotExceedLimits(
    'https://www.national-lottery.co.uk/games/euromillions',
  );

  switch (msg.content) {
    case '!lotto':
      msg.channel.send('You are now subscribed to lotto reminders.');
      interval = setInterval(function () {
        if (lotto) {
          msg.channel
            .send('Please take an eye break now!')
            .catch(console.error);
        } else {
          msg.channel
            .send('Please take an eye break now!')
            .catch(console.error);
        }
      }, 3600000); //every hour
      break;
    case '!stop':
      msg.channel.send('I have stopped lotto reminders.');
      clearInterval(interval);
      break;
  }
});

client.login(process.env.CLIENT_TOKEN);
