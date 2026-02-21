const axios = require("axios");
require('dotenv').config();

const CHANNEL_ID = process.env.CHANNEL_ID;

function formatNumber(number) {
  return new Intl.NumberFormat("pt-BR").format(number);
}

function getEmojiPosition(position) {
  const emojis = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"];
  return emojis[position - 1] || `${position}.`;
}

async function getTopVideos() {
  // 1️⃣ Buscar últimos 50 vídeos do canal
  const searchResponse = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        channelId: CHANNEL_ID,
        maxResults: 50,
        order: "date",
        type: "video",
        key: process.env.YOUTUBE_API_KEY
      }
    }
  );

  const videoIds = searchResponse.data.items.map(v => v.id.videoId).join(",");

  // 2️⃣ Buscar estatísticas reais
  const statsResponse = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        part: "snippet,statistics",
        id: videoIds,
        key: process.env.YOUTUBE_API_KEY
      }
    }
  );

  const videos = statsResponse.data.items;

  // 3️⃣ Ordenar por views
  const sorted = videos.sort(
    (a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
  );

  return sorted.slice(0, 10);
}

function buildPost(videos) {
  let texto = "🚀 Top 10 dos vídeos mais acessados no canal Hora do QA !!!\n\n";

  videos.forEach((video, index) => {
    const views = formatNumber(video.statistics.viewCount);
    const emoji = getEmojiPosition(index + 1);
    const url = `https://www.youtube.com/watch?v=${video.id}`;

    texto += `${emoji} - ${views} - ${video.snippet.title} - ${url}\n\n`;
  });

  texto +=
`📌 Inscreva-se no canal: https://lnkd.in/dgVAPDHr

🔔 Ative o sininho para não perder nenhuma novidade

👍 Curta os vídeos e compartilhe com outros profissionais da área

Nosso Discord: https://lnkd.in/dtdikh8T

Nos vemos por lá! 🚀`;

  return texto;
}

async function postOnLinkedIn(text) {
  const linkedinUser = await axios.get(
    "https://api.linkedin.com/v2/me",
    {
      headers: {
        Authorization: `Bearer ${process.env.LINKEDIN_TOKEN}`
      }
    }
  );

  const authorUrn = `urn:li:person:${linkedinUser.data.id}`;

  await axios.post(
    "https://api.linkedin.com/v2/ugcPosts",
    {
      author: authorUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: text
          },
          shareMediaCategory: "NONE"
        }
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
      }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.LINKEDIN_TOKEN}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json"
      }
    }
  );
}

async function run() {
  try {
    const topVideos = await getTopVideos();
    const postText = buildPost(topVideos);
    await postOnLinkedIn(postText);
    console.log("✅ Post publicado com sucesso!");
  } catch (error) {
    console.error("❌ Erro:", error.response?.data || error.message);
  }
}

run();