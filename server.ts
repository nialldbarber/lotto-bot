require('dotenv').config();

import {Client, Intents} from 'discord.js';
import {doesJackpotExceedLimits} from './scraper';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let interval: any;

client.on('message', async (msg: any) => {
  const lotto = await doesJackpotExceedLimits();

  switch (msg.content) {
    case '!lotto':
      msg.channel.send('You are now subscribed to lotto reminders.');
      interval = setInterval(() => {
        if (lotto) {
          msg.channel
            .send('🤑 Euromillions jackpot is over £100 million!')
            .catch(console.error);
        } else {
          msg.channel.send('🤑 NOPE!').catch(console.error);
        }
      }, 900000);
      break;
    case '!stop':
      msg.channel.send('No worries, no more lotto reminders.');
      clearInterval(interval);
      break;
  }
});

client.login(process.env.CLIENT_TOKEN);
