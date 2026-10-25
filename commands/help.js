// commands/help.js

module.exports = async function help(ctx) {
  await ctx.reply(
    "╭━━━〔 📱 APK MAKER XMD 〕━━━╮\n\n" +
    "👋 Welcome to the Help Menu!\n\n" +
    "🌐 URL TO APK\n" +
    "Convert your website URL into an Android app.\n\n" +
    "📁 ZIP/HTML TO APK\n" +
    "Upload your website ZIP file to prepare an app.\n\n" +
    "👥 REFERRAL SYSTEM\n" +
    "Invite 5 new users to unlock APK generation.\n\n" +
    "📋 AVAILABLE COMMANDS\n\n" +
    "▫️ /start - Start the bot\n" +
    "▫️ /menu - Open the main menu\n" +
    "▫️ /referral - Get your referral link\n" +
    "▫️ /profile - View your profile\n" +
    "▫️ /myapps - View your apps\n" +
    "▫️ /help - Show this help menu\n" +
    "▫️ /admin - Open the admin menu\n\n" +
    "👑 Developer: Simon Tech Inc\n\n" +
    "╰━━━━━━━━━━━━━━━━━━━━╯"
  );
};
