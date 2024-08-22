require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const TelegramBot = require("node-telegram-bot-api");

const token = process.env.BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

const bot = new TelegramBot(token, { polling: true });

bot.on("poll", () => {
  console.log("poll");
});

bot.on("polling_error", (error) => {
  console.log("---polling_error");
  console.log(error.code);
  console.log(error.message);
});
bot.on("error", (error) => {
  console.log("---error");
  console.log(error.code);
  console.log(error.message);
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  console.log("userMessage:", text);

  if (text === "/start") {
    await bot.sendMessage(chatId, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Открыть Гороскоп", web_app: { url: webAppUrl } }],
        ],
      },
    });
  } else {
    await bot.sendMessage(chatId, "Message recieved");
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server has been started at port ${PORT}...`);
});

setTimeout(() => {
  console.error(`AAAAAAAAAAAAAAAAAAAAAAA...`);
}, 10000);
