require("dotenv").config();

const { Telegraf, session } = require("telegraf");
const config = require("./config");

if (!config.BOT_TOKEN) {
  throw new Error("BOT_TOKEN is missing from .env");
}

if (!Number.isSafeInteger(config.OWNER_ID) ||
    config.OWNER_ID <= 0) {
  throw new Error("Set a valid OWNER_ID in .env");
}

const bot = new Telegraf(config.BOT_TOKEN);

bot.use(session());

bot.start(require("./commands/start"));
bot.command("menu", require("./commands/menu"));
bot.command("referral", require("./commands/referral"));
bot.command("profile", require("./commands/profile"));
bot.command("myapps", require("./commands/myapps"));
bot.command("help", require("./commands/help"));
bot.command("admin", require("./commands/admin"));

bot.action("url_to_apk", async ctx => {
  await ctx.answerCbQuery();
  await require("./commands/url-to-apk")(ctx);
});

bot.action("zip_to_apk", async ctx => {
  await ctx.answerCbQuery();
  await require("./commands/zip-to-apk")(ctx);
});

bot.action("my_apps", async ctx => {
  await ctx.answerCbQuery();
  await require("./commands/myapps")(ctx);
});

bot.action("profile", async ctx => {
  await ctx.answerCbQuery();
  await require("./commands/profile")(ctx);
});

bot.action("referrals", async ctx => {
  await ctx.answerCbQuery();
  await require("./commands/referral")(ctx);
});

bot.action("help", async ctx => {
  await ctx.answerCbQuery();
  await require("./commands/help")(ctx);
});

bot.action("verify_join", async ctx => {
  await ctx.answerCbQuery();

  const { checkForceJoin } = require("./middleware/forcejoin");
  const joined = await checkForceJoin(ctx);

  if (!joined) {
    return ctx.reply(
      "❌ You have not joined all required channels.",
      {
        reply_markup:
          require("./keyboards/forcejoin-menu")
      }
    );
  }

  await ctx.reply(
    "✅ Membership verified!\n\nUse /menu to continue."
  );
});

bot.action("cancel", async ctx => {
  await ctx.answerCbQuery("Cancelled.");
  ctx.session = {};
  await ctx.reply("❌ Operation cancelled.");
});

bot.on("text", async ctx => {
  const session = ctx.session || {};

  if (!session.waitingFor) return;

  if (ctx.message.text === "/cancel") {
    ctx.session = {};
    return ctx.reply("❌ Operation cancelled.");
  }

  if (session.waitingFor === "url") {
    const { validateUrl } = require("./converters/validator");
    const result = validateUrl(ctx.message.text);

    if (!result.valid) {
      return ctx.reply("❌ " + result.message);
    }

    ctx.session.url = result.url;
    ctx.session.waitingFor = "app_name";

    return ctx.reply(
      "📱 Enter your Android app name."
    );
  }

  if (session.waitingFor === "app_name") {
    const { safeAppName } = require("./utils/helpers");
    const name = safeAppName(ctx.message.text);

    if (!name) {
      return ctx.reply("❌ Enter a valid app name.");
    }

    ctx.session.appName = name;
    ctx.session.waitingFor = "version";

    return ctx.reply(
      "⚙️ Select the app version:",
      {
        reply_markup:
          require("./keyboards/version-menu")
      }
    );
  }
});

bot.action(/^version_(1\.0\.0|2\.0\.0)$/, async ctx => {
  await ctx.answerCbQuery();

  const session = ctx.session || {};

  if (!session.url || !session.appName) {
    return ctx.reply(
      "Your conversion session has expired. Start again with /menu."
    );
  }

  session.version = ctx.match[1];

  await ctx.reply(
    "✅ APP DETAILS RECEIVED\n\n" +
    `📱 Name: ${session.appName}\n` +
    `🌐 URL: ${session.url}\n` +
    `⚙️ Version: ${session.version}\n\n` +
    "⚠️ The Android build service must be installed " +
    "and connected before an APK can be generated."
  );

  ctx.session = {};
});

bot.catch((error, ctx) => {
  console.error("Telegram bot error:", error);

  if (ctx) {
    ctx.reply(
      "⚠️ An error occurred. Please try again later."
    ).catch(() => {});
  }
});

bot.launch()
  .then(() => console.log("APK MAKER XMD is running"))
  .catch(error => {
    console.error("Failed to start bot:", error);
    process.exit(1);
  });

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
