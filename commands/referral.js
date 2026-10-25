const config = require("../config");
const { getReferralCount } = require("../database/referrals");

module.exports = async function referral(ctx) {
  const count = getReferralCount(ctx.from.id);
  const botInfo = await ctx.telegram.getMe();

  const link =
    `https://t.me/${botInfo.username}?start=${ctx.from.id}`;

  await ctx.reply(
    "👥 YOUR REFERRAL DASHBOARD\n\n" +
    `🎯 Progress: ${count}/${config.REQUIRED_REFERRALS}\n\n` +
    "🔗 Your invitation link:\n" +
    `${link}\n\n` +
    "Share this link with new users.\n" +
    "Self-referrals are not allowed."
  );
};
