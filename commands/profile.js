const { getUser } = require("../database/users");
const { getReferralCount } = require("../database/referrals");

module.exports = async function profile(ctx) {
  const user = getUser(ctx.from.id);

  if (!user) {
    return ctx.reply("Send /start first.");
  }

  await ctx.reply(
    "👤 YOUR PROFILE\n\n" +
    `🆔 ID: ${user.id}\n` +
    `👤 Name: ${user.firstName}\n` +
    `👥 Referrals: ${getReferralCount(user.id)}\n` +
    `📦 Apps created: ${user.appsCreated}\n` +
    `📅 Registered: ${user.createdAt}`
  );
};
