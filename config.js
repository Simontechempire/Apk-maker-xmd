require("dotenv").config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  OWNER_ID: Number(process.env.OWNER_ID),

  BOT_NAME: process.env.BOT_NAME || "APK MAKER XMD",

  BOT_IMAGE:
    process.env.BOT_IMAGE ||
    "https://files.catbox.moe/dr11dh.jpg",

  REQUIRED_REFERRALS: Number(
    process.env.REQUIRED_REFERRALS || 5
  ),

  BUILD_DIR: process.env.BUILD_DIR || "./temp",
  UPLOAD_DIR: process.env.UPLOAD_DIR || "./uploads",
  OUTPUT_DIR: process.env.OUTPUT_DIR || "./generated",

  FORCE_CHANNELS: [
    {
      name: "Simon Tech Inc",
      url: "https://t.me/missarcond",
      chatId: "@missarcond"
    },
    {
      name: "Simon Tech Support",
      url: "https://t.me/babyupdategc",
      chatId: "@babyupdategc"
    },
    {
      name: "Tyla Tech",
      url: "https://t.me/simontech2027",
      chatId: "@simontech2027"
    }
  ],

  REQUIRED_BOT: {
    name: "Fox Official",
    url: "https://t.me/FoxBotOfficial_bot"
  }
};
