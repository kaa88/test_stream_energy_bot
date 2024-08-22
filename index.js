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

app.post("/", (req, res) => {
  console.log("method-POST");
  console.log(req.body);

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === "/start") {
      await bot.sendMessage(chatId, "Гороскоп", {
        reply_markup: {
          inline_keyboard: [[{ text: "Открыть", web_app: { url: webAppUrl } }]],
        },
      });
    }
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server has been started at port ${PORT}...`);
});
