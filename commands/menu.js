const menu = require("../keyboards/main-menu");
const { requireJoin } = require("../middleware/forcejoin");

module.exports = async function showMenu(ctx) {
  if (!(await requireJoin(ctx))) return;

  await ctx.reply(
    "📱 APK MAKER XMD\n\nChoose a feature:",
    menu
  );
};
