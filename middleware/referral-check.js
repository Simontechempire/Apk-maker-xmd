const config = require("../config");
const { getReferralCount } = require("../database/referrals");

function hasEnoughReferrals(userId) {
  return (
    getReferralCount(userId) >=
    config.REQUIRED_REFERRALS
  );
}

async function requireReferrals(ctx) {
  const count = getReferralCount(ctx.from.id);

  if (count >= config.REQUIRED_REFERRALS) {
    return true;
  }

  await ctx.reply(
    "🎁 REFERRAL REQUIREMENT\n\n" +
    `👥 Your referrals: ${count}/${config.REQUIRED_REFERRALS}\n\n` +
    `Invite ${config.REQUIRED_REFERRALS - count} more users to unlock APK generation.\n\n` +
    "Use /referral to get your invitation link."
  );

  return false;
}

module.exports = {
  hasEnoughReferrals,
  requireReferrals
};
