const { getApps } = require("../database/apps");

module.exports = async function myApps(ctx) {
  const apps = getApps(ctx.from.id);

  if (!apps.length) {
    return ctx.reply(
      "📦 You have not created any apps yet."
    );
  }

  const text = apps.map((app, index) =>
    `${index + 1}. ${app.name}\n` +
    `Version: ${app.version}\n` +
    `Status: ${app.status || "Unknown"}`
  ).join("\n\n");

  await ctx.reply("📦 YOUR APPS\n\n" + text);
};
