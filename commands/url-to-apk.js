const { requireJoin } = require("../middleware/forcejoin");
const { requireReferrals } = require("../middleware/referral-check");
const versions = require("../keyboards/version-menu");

module.exports = async function urlToApk(ctx) {
  if (!(await requireJoin(ctx))) return;

  if (!(await requireReferrals(ctx))) return;

  ctx.session = ctx.session || {};
  ctx.session.waitingFor = "url";

  await ctx.reply(
    "🌐 TURN URL INTO APP\n\n" +
    "Send your public HTTPS website URL.\n\n" +
    "Example: https://example.com\n\n" +
    "Send /cancel to stop."
  );
};
