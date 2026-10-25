const { readDB, writeDB } = require("./database");

function addReferral(referrerId, newUserId) {
  const db = readDB();

  const referrer = db.users[String(referrerId)];
  const newUser = db.users[String(newUserId)];

  if (!referrer || !newUser) return false;

  if (String(referrerId) === String(newUserId)) {
    return false;
  }

  if (newUser.referredBy) return false;

  if (referrer.referrals.includes(Number(newUserId))) {
    return false;
  }

  referrer.referrals.push(Number(newUserId));
  newUser.referredBy = Number(referrerId);

  writeDB(db);

  return true;
}

function getReferralCount(userId) {
  const db = readDB();
  const user = db.users[String(userId)];

  return user ? user.referrals.length : 0;
}

module.exports = {
  addReferral,
  getReferralCount
};
