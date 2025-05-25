const express = require("express");
const crypto = require("crypto");

const app = express();

const VERIFICATION_TOKEN = "my_custom_verification_token_2025_1234567890";
const ENDPOINT_URL = "https://ebay-webhook-mg9p.onrender.com/notifications";

app.use(express.json());

app.get("/notifications", (req, res) => {
  const challengeCode = req.query.challenge_code;
  if (!challengeCode) {
    return res.status(400).send("Missing challenge_code");
  }

  const hash = crypto.createHash("sha256");
  hash.update(challengeCode);
  hash.update(VERIFICATION_TOKEN);
  hash.update(ENDPOINT_URL);
  const challengeResponse = hash.digest("hex");

  console.log("✅ Responding with challengeResponse:", challengeResponse);
  res.status(200).json({ challengeResponse });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
