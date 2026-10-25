const { requireJoin } = require("../middleware/forcejoin");
const { requireReferrals } = require("../middleware/referral-check");

module.exports = async function zipToApk(ctx) {
  if (!(await requireJoin(ctx))) return;

  if (!(await requireReferrals(ctx))) return;

  ctx.session = ctx.session || {};
  ctx.session.waitingFor = "zip";

  await ctx.reply(
    "📁 ZIP/HTML TO APP\n\n" +
    "Upload a ZIP archive containing your website.\n" +
    "It must include index.html.\n\n" +
    "The actual APK build service must be configured " +
    "before uploaded files can be compiled."
  );
};
