require('dotenv').config();

import {Client, Intents} from 'discord.js';
import {doesJackpotExceedLimits} from './scraper';

import type * as TDiscord from 'discord.js';

const client: TDiscord.Client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let interval: NodeJS.Timer;

client.on('messageCreate', async (msg: TDiscord.Message) => {
  const lotto = await doesJackpotExceedLimits();

  switch (msg.content) {
    case '!lotto':
      msg.channel.send('You are now subscribed to lotto reminders.');
      interval = setInterval((): void => {
        if (lotto?.doesExceed) {
          msg.channel
            .send(
              `🤑 Euromillions jackpot is ${lotto?.amount}!, buy a ticket: (${process.env.BUY})`,
            )
            .catch(console.error);
        }
      }, 3600000);
      break;
    case '!stop':
      msg.channel.send('No worries, no more lotto reminders.');
      clearInterval(interval);
      break;
  }
});

client.login(process.env.CLIENT_TOKEN);
