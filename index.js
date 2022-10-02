import TelegramAPI from 'node-telegram-bot-api';
import Express from 'express';
import 'dotenv/config';
import { gameOptions,againGame } from './options.js';
const TOKEN = process.env.TOKEN;

const bot = new TelegramAPI(TOKEN, { polling: true });

const chats = {};

const app = Express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.end('<h1>It is a bot!!!!(((((((((=</h1>');
  });
  app.listen(PORT, () => {
    console.log('Server has been started');
  });

const startGame = async (chatId) => {
  await bot.sendMessage(chatId, 'Я загадал число от 0 до 9, угадыай');
  const NUMBER = Math.floor(Math.random() * 10);
  chats[chatId] = NUMBER;
  await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
};
bot.setMyCommands([
  { command: '/start', description: 'Ку, это бот для игры в угадай число' },
  { command: '/game', description: 'Игра "Угадай число"' },
]);
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === '/game') {
    return startGame(chatId);
  }
});
bot.on('callback_query', (msg) => {
  const data = msg.data;
  const chatId = msg.message.chat.id;
  if (data === '/again') {
    return startGame(chatId);
  }
  if (data == chats[chatId]) {
    return bot.sendMessage(chatId, `Ты угадал ${chats[chatId]}`, againGame);
  } else {
    return bot.sendMessage(chatId, `Ты не угадал ${chats[chatId]}`, againGame);
  }
});
