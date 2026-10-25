module.exports = {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "🌐 Turn URL Into App",
          callback_data: "url_to_apk"
        }
      ],
      [
        {
          text: "📁 ZIP/HTML Into App",
          callback_data: "zip_to_apk"
        }
      ],
      [
        {
          text: "📦 My Apps",
          callback_data: "my_apps"
        },
        {
          text: "👤 My Profile",
          callback_data: "profile"
        }
      ],
      [
        {
          text: "👥 Refer Friends",
          callback_data: "referrals"
        }
      ],
      [
        {
          text: "ℹ️ Help",
          callback_data: "help"
        }
      ]
    ]
  }
};
