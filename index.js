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
    const parsed = JSON.parse(req.body);
    console.log("--chat id", parsed.chat?.id);
    console.log(JSON.stringify({ ...req.body }));
    bot.processUpdate(req.body);

    const chatId = req.body.chat?.id;
    const text = req.body.text;
    await bot.sendMessage(chatId, `Recieved your message: ${text}`);

    res.sendStatus(200);
  } catch (e) {
    console.error(e.message || "ERROR");
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server has been started at port ${PORT}...`);
});

/////

// bot.on("message", async (msg) => {
//   const chatId = msg.chat.id;
//   const text = msg.text;

//   console.log("userMessage:", text);

//   if (text === "/start") {
//     await bot.sendMessage(chatId, {
//       reply_markup: {
//         inline_keyboard: [
//           [{ text: "Открыть Гороскоп", web_app: { url: WEB_APP_URL } }],
//         ],
//       },
//     });
//   } else {
//     await bot.sendMessage(chatId, "Message recieved");
//   }
// });

// const obj = {
//   update_id: 72118410,
//   message: {
//     message_id: 56,
//     from: {
//       id: 2002404230,
//       is_bot: false,
//       first_name: "Andrei",
//       last_name: "K",
//       username: "kaa021088",
//       language_code: "ru",
//     },
//     chat: {
//       id: 2002404230,
//       first_name: "Andrei",
//       last_name: "K",
//       username: "kaa021088",
//       type: "private",
//     },
//     date: 1724313155,
//     text: "64",
//   },
// };
