import express from "express";
import open from "open";
import axios from "axios";

const CLIENT_ID = process.env.CLIENT_ID || "";
const CLIENT_SECRET = process.env.CLIENT_SECRET || "";
const REDIRECT_URI = "http://localhost:3000/callback";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("❌ Defina CLIENT_ID e CLIENT_SECRET como variáveis de ambiente!");
  process.exit(1);
}

const app = express();

app.get("/callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send("Código não encontrado!");

  try {
    // Troca code por access_token
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);

    const tokenResponse = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;
    res.send(`
      ✅ Token gerado com sucesso!<br/>
      <b>Token:</b> ${accessToken}<br/><br/>
      Copie para usar no seu workflow do GitHub.
    `);

    console.log("\n🔥 LINKEDIN_TOKEN:", accessToken, "\n");
    process.exit(0); // fecha servidor automaticamente
  } catch (err) {
    console.error("❌ Erro ao gerar token:", err.response?.data || err.message);
    res.send("❌ Erro ao gerar token. Veja o terminal.");
  }
});

app.listen(3000, async () => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=openid%20profile%20email%20w_member_social`;

  console.log("🌐 Abrindo navegador para autorizar app...");
  await open(authUrl);
});