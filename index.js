// ╔══════════════════════════════════════╗
//       📱 APK MAKER XMD
//       👑 Developer: Simon Tech Inc
// ╚══════════════════════════════════════╝

require("dotenv").config();

const http = require("http");
const { Telegraf, session } = require("telegraf");
const config = require("./config");

// ═══════════════════════════════════════
// 🌐 RENDER WEB SERVER
// ═══════════════════════════════════════

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });

    return res.end(JSON.stringify({
      status: "online",
      bot: "APK MAKER XMD",
      developer: "Simon Tech Inc"
    }));
  }

  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8"
  });

  res.end("🚀 APK MAKER XMD is running!");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Web server listening on port ${PORT}`);
});

// ═══════════════════════════════════════
// 🤖 BOT CONFIGURATION
// ═══════════════════════════════════════

if (!config.BOT_TOKEN) {
  throw new Error("BOT_TOKEN is missing from .env");
}

if (
  !Number.isSafeInteger(config.OWNER_ID) ||
  config.OWNER_ID <= 0
) {
  throw new Error("Set a valid OWNER_ID in .env");
}

const bot = new Telegraf(config.BOT_TOKEN);

bot.use(session());

// ═══════════════════════════════════════
// 📋 BOT COMMANDS
// ═══════════════════════════════════════

bot.start(require("./commands/start"));
bot.command("menu", require("./commands/menu"));
bot.command("referral", require("./commands/referral"));
bot.command("profile", require("./commands/profile"));
bot.command("myapps", require("./commands/myapps"));
bot.command("help", require("./commands/help"));
bot.command("admin", require("./commands/admin"));

// ═══════════════════════════════════════
// 🔘 MAIN MENU CALLBACKS
// ═══════════════════════════════════════

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

// ═══════════════════════════════════════
// ✅ VERIFY CHANNEL MEMBERSHIP
// ═══════════════════════════════════════

bot.action("verify_join", async ctx => {
  await ctx.answerCbQuery();

  try {
    const { checkForceJoin } = require("./middleware/forcejoin");
    const joined = await checkForceJoin(ctx);

    if (!joined) {
      return ctx.reply(
        "❌ You have not joined all required channels.",
        {
          reply_markup: require("./keyboards/forcejoin-menu")
        }
      );
    }

    await ctx.reply(
      "✅ Membership verified!\n\nUse /menu to continue."
    );
  } catch (error) {
    console.error("Membership verification error:", error);

    await ctx.reply(
      "⚠️ Unable to verify membership right now. Please try again."
    );
  }
});

// ═══════════════════════════════════════
// ❌ CANCEL OPERATION
// ═══════════════════════════════════════

bot.action("cancel", async ctx => {
  await ctx.answerCbQuery("Cancelled.");

  ctx.session = {};

  await ctx.reply("❌ Operation cancelled.");
});

// ═══════════════════════════════════════
// 🌐 URL AND APP NAME INPUT
// ═══════════════════════════════════════

bot.on("text", async ctx => {
  const currentSession = ctx.session || {};
  const messageText = ctx.message.text.trim();

  if (!currentSession.waitingFor) return;

  if (messageText === "/cancel") {
    ctx.session = {};
    return ctx.reply("❌ Operation cancelled.");
  }

  if (currentSession.waitingFor === "url") {
    const { validateUrl } = require("./converters/validator");
    const result = validateUrl(messageText);

    if (!result.valid) {
      return ctx.reply("❌ " + result.message);
    }

    ctx.session.url = result.url;
    ctx.session.waitingFor = "app_name";

    return ctx.reply(
      "📱 Enter your Android app name."
    );
  }

  if (currentSession.waitingFor === "app_name") {
    const { safeAppName } = require("./utils/helpers");
    const name = safeAppName(messageText);

    if (!name) {
      return ctx.reply("❌ Enter a valid app name.");
    }

    ctx.session.appName = name;
    ctx.session.waitingFor = "version";

    return ctx.reply(
      "⚙️ Select the app version:",
      {
        reply_markup: require("./keyboards/version-menu")
      }
    );
  }
});

// ═══════════════════════════════════════
// ⚙️ APP VERSION SELECTION
// ═══════════════════════════════════════

bot.action(/^version_(1\.0\.0|2\.0\.0)$/, async ctx => {
  await ctx.answerCbQuery();

  const currentSession = ctx.session || {};

  if (!currentSession.url || !currentSession.appName) {
    return ctx.reply(
      "⚠️ Your conversion session has expired.\n\n" +
      "Start again using /menu."
    );
  }

  currentSession.version = ctx.match[1];

  await ctx.reply(
    "╭━━━〔 📱 APK MAKER XMD 〕━━━╮\n\n" +
    "✅ APP DETAILS RECEIVED\n\n" +
    `📱 Name: ${currentSession.appName}\n` +
    `🌐 URL: ${currentSession.url}\n` +
    `⚙️ Version: ${currentSession.version}\n\n` +
    "⚠️ APK compilation is not connected yet.\n" +
    "Your app details have been received, but an APK " +
    "cannot be generated until the Android build service is configured.\n\n" +
    "╰━━━━━━━━━━━━━━━━━━━━╯"
  );

  ctx.session = {};
});

// ═══════════════════════════════════════
// 🛡️ ERROR HANDLER
// ═══════════════════════════════════════

bot.catch((error, ctx) => {
  console.error("Telegram bot error:", error);

  if (ctx) {
    ctx.reply(
      "⚠️ An error occurred. Please try again later."
    ).catch(() => {});
  }
});

// ═══════════════════════════════════════
// 🚀 START BOT
// ═══════════════════════════════════════

async function startBot() {
  try {
    await bot.launch();
    console.log("🤖 APK MAKER XMD Telegram bot is running!");
  } catch (error) {
    console.error("❌ Failed to start Telegram bot:", error);
    process.exitCode = 1;
  }
}

startBot();

// ═══════════════════════════════════════
// 🛑 GRACEFUL SHUTDOWN
// ═══════════════════════════════════════

async function shutdown(signal) {
  console.log(`\n${signal} received. Shutting down...`);

  try {
    bot.stop(signal);
  } catch (error) {
    console.error("Bot shutdown error:", error);
  }

  server.close(() => {
    console.log("🌐 HTTP server closed.");
    process.exit(0);
  });

  setTimeout(() => process.exit(0), 5000).unref();
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));
