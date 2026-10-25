const config = require("../config");

module.exports = {
  inline_keyboard: [
    ...config.FORCE_CHANNELS.map(channel => [
      {
        text: `📢 Join ${channel.name}`,
        url: channel.url
      }
    ]),
    [
      {
        text: "🤖 Open Fox Official",
        url: config.REQUIRED_BOT.url
      }
    ],
    [
      {
        text: "✅ I've Joined — Verify",
        callback_data: "verify_join"
      }
    ]
  ]
};
