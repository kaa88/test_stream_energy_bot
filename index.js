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

app.post(`/bot${TOKEN}`, async (req, res) => {
  try {
    const chatId = req.body.message?.chat?.id;
    const lang = req.body.message?.from?.language_code;
    const text = req.body.message?.text;

    console.log("chatId", chatId);
    console.log("lang", lang);
    console.log("text", text);

    if (!chatId || !text)
      throw new Error("Cannot send message with missing props");

    bot.processUpdate(req.body);

    if (text === "/start") {
      await bot.sendMessage(chatId, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: lang === "ru" ? "Открыть гороскоп" : "Open horoscope",
                web_app: { url: WEB_APP_URL },
              },
            ],
          ],
        },
      });
    } else {
      await bot.sendMessage(
        chatId,
        `${lang === "ru" ? "Неизвестный запрос" : "Unknown request"} "${text}"`
      );
    }

    res.sendStatus(200);
  } catch (e) {
    console.error(e.message || "ERROR");
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server has been started at port ${PORT}...`);
});
