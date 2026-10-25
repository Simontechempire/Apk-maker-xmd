const config = require("../config");

module.exports = async function admin(ctx) {
  if (ctx.from.id !== config.OWNER_ID) {
    return ctx.reply("⛔ Owner only.");
  }

  await ctx.reply(
    "👑 APK MAKER XMD ADMIN\n\n" +
    "Bot is responding.\n\n" +
    "This is the basic admin panel. " +
    "Build management and user administration " +
    "must be implemented separately."
  );
};
