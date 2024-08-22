require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
// app.use(cors());

const TOKEN = process.env.BOT_TOKEN;
const BOT_URL = process.env.BOT_URL;
const WEB_APP_URL = process.env.WEB_APP_URL;

const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(TOKEN);

bot.setWebHook(`${BOT_URL}/bot${TOKEN}`);

app.post(`/bot${TOKEN}`, (req, res) => {
  console.log("try to update");
  console.log(JSON.stringify(req.body));
  bot.processUpdate(req.body);
  res.sendStatus(200);

  const chatId = req.body.chat.id;
  const text = req.body.text;
  bot.sendMessage(chatId, `Recieved your message: ${text}`);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server has been started at port ${PORT}...`);
});

/////

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  console.log("userMessage:", text);

  if (text === "/start") {
    await bot.sendMessage(chatId, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Открыть Гороскоп", web_app: { url: WEB_APP_URL } }],
        ],
      },
    });
  } else {
    await bot.sendMessage(chatId, "Message recieved");
  }
});
