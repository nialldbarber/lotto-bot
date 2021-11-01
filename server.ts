require('dotenv').config();

import {Client, Intents} from 'discord.js';
import {doesJackpotExceedLimits} from './scraper';

import type * as TDiscord from 'discord.js';

const client: TDiscord.Client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let interval: NodeJS.Timer;

client.on('message', async (msg: TDiscord.Message) => {
  const lotto = await doesJackpotExceedLimits();

  switch (msg.content) {
    case '!lotto':
      msg.channel.send('You are now subscribed to lotto reminders.');
      interval = setInterval(() => {
        if (lotto) {
          msg.channel
            .send(
              `🤑 Euromillions jackpot is over £100 million!, [buy a ticket here](${process.env.BUY})`,
            )
            .catch(console.error);
        } else {
          msg.channel
            .send(`🤑 NOPE! [buy a ticket here](${process.env.BUY})`)
            .catch(console.error);
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
