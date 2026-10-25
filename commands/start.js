const { createUser } = require("../database/users");
const { addReferral } = require("../database/referrals");
const { requireJoin } = require("../middleware/forcejoin");
const menu = require("../keyboards/main-menu");
const config = require("../config");

module.exports = async function start(ctx) {
  const args = ctx.message.text.split(/\s+/);
  const payload = args[1];

  const isNew = !require("../database/users")
    .getUser(ctx.from.id);

  createUser(
    ctx.from.id,
    ctx.from.username,
    ctx.from.first_name
  );

  if (isNew && payload && /^\d+$/.test(payload)) {
    addReferral(Number(payload), ctx.from.id);
  }

  if (!(await requireJoin(ctx))) return;

  await ctx.reply(
    `╭━━━〔 📱 ${config.BOT_NAME} 〕━━━╮\n\n` +
    `👋 Welcome, ${ctx.from.first_name || "User"}!\n\n` +
    "🌐 Convert websites into Android apps.\n" +
    "📁 Convert supported ZIP/HTML projects.\n" +
    "👥 Invite friends to unlock building.\n\n" +
    "╰━━━━━━━━━━━━━━━━━━━━╯",
    menu
  );
};
