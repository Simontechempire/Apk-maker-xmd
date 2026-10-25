const fs = require("fs");

async function sendApk(ctx, filePath, appName) {
  if (!fs.existsSync(filePath)) {
    throw new Error("The APK file does not exist.");
  }

  await ctx.replyWithDocument(
    {
      source: filePath,
      filename: `${appName}.apk`
    },
    {
      caption:
        "✅ APK BUILD COMPLETED\n\n" +
        `📱 App: ${appName}\n` +
        "📦 Format: Android APK"
    }
  );
}

module.exports = {
  sendApk
};
