const config = require("../config");
const forceJoinKeyboard = require("../keyboards/forcejoin-menu");

async function checkForceJoin(ctx) {
  const userId = ctx.from.id;

  for (const channel of config.FORCE_CHANNELS) {
    try {
      const member = await ctx.telegram.getChatMember(
        channel.chatId,
        userId
      );

      const allowed = [
        "creator",
        "administrator",
        "member"
      ].includes(member.status);

      const restrictedMember =
        member.status === "restricted" &&
        member.is_member === true;

      if (!allowed && !restrictedMember) {
        return false;
      }
    } catch (error) {
      console.error(
        `Membership check failed for ${channel.name}:`,
        error.message
      );

      return false;
    }
  }

  return true;
}

async function requireJoin(ctx) {
  const joined = await checkForceJoin(ctx);

  if (joined) return true;

  const message =
    "🔒 APK MAKER XMD — FORCE JOIN\n\n" +
    "Join all three required channels, then tap Verify.\n\n" +
    "Fox Official is linked separately below.";

  if (ctx.callbackQuery) {
    await ctx.answerCbQuery(
      "Please join the required channels first."
    ).catch(() => {});
  }

  await ctx.reply(message, {
    reply_markup: forceJoinKeyboard
  }).catch(() => {});

  return false;
}

module.exports = {
  checkForceJoin,
  requireJoin
};
