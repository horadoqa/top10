const axios = require("axios");
const fs = require("fs");
require("dotenv").config();

const CHANNEL_ID = process.env.CHANNEL_ID;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const LINKEDIN_TOKEN = process.env.LINKEDIN_TOKEN;
const IMAGE_PATH = "./top10.png"; // caminho da imagem para postar

// 1️⃣ Função de formatação de número
function formatNumber(number) {
  return new Intl.NumberFormat("pt-BR").format(number);
}

// 2️⃣ Função para emojis de posição
function getEmojiPosition(position) {
  const emojis = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟"];
  return emojis[position - 1] || `${position}.`;
}

// 3️⃣ Buscar vídeos mais recentes e estatísticas
async function getTopVideos() {
  const searchResponse = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        channelId: CHANNEL_ID,
        maxResults: 50,
        order: "date",
        type: "video",
        key: YOUTUBE_API_KEY
      }
    }
  );

  const videoIds = searchResponse.data.items.map(v => v.id.videoId).join(",");

  const statsResponse = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        part: "snippet,statistics",
        id: videoIds,
        key: YOUTUBE_API_KEY
      }
    }
  );

  const videos = statsResponse.data.items;
  const sorted = videos.sort(
    (a, b) => Number(b.statistics.viewCount) - Number(a.statistics.viewCount)
  );

  return sorted.slice(0, 10);
}

// 4️⃣ Construir o texto do post
function buildPost(videos) {
  let texto = "🚀 Top 10 dos vídeos mais acessados no canal Hora do QA !!!\n\n";

  videos.forEach((video, index) => {
    const views = formatNumber(video.statistics.viewCount);
    const emoji = getEmojiPosition(index + 1);
    const url = `https://www.youtube.com/watch?v=${video.id}`;
    texto += `${emoji} - ${views} - ${video.snippet.title} - ${url}\n\n`;
  });

  texto += `📌 Inscreva-se no canal: https://lnkd.in/dgVAPDHr

🔔 Ative o sininho para não perder nenhuma novidade
👍 Curta os vídeos e compartilhe com outros profissionais da área
Nosso Discord: https://lnkd.in/dtdikh8T
Nos vemos por lá! 🚀`;

  return texto;
}

// 5️⃣ Registrar upload da imagem
async function registerImageUpload() {
  const linkedinUser = await axios.get(
    "https://api.linkedin.com/v2/me",
    { headers: { Authorization: `Bearer ${LINKEDIN_TOKEN}` } }
  );

  const authorUrn = `urn:li:person:${linkedinUser.data.id}`;

  const registerResponse = await axios.post(
    "https://api.linkedin.com/v2/assets?action=registerUpload",
    {
      registerUploadRequest: {
        recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
        owner: authorUrn,
        serviceRelationships: [
          {
            relationshipType: "OWNER",
            identifier: "urn:li:userGeneratedContent"
          }
        ]
      }
    },
    {
      headers: {
        Authorization: `Bearer ${LINKEDIN_TOKEN}`,
        "Content-Type": "application/json"
      }
    }
  );

  return {
    uploadUrl: registerResponse.data.value.uploadMechanism["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"].uploadUrl,
    asset: registerResponse.data.value.asset
  };
}

// 6️⃣ Fazer upload da imagem
async function uploadImage(uploadUrl, filePath) {
  const imageData = fs.readFileSync(filePath);
  await axios.put(uploadUrl, imageData, {
    headers: {
      "Content-Type": "image/png",
      "Content-Length": imageData.length
    }
  });
}

// 7️⃣ Criar post no LinkedIn com imagem
async function postOnLinkedInWithImage(text, asset) {
  const linkedinUser = await axios.get(
    "https://api.linkedin.com/v2/me",
    { headers: { Authorization: `Bearer ${LINKEDIN_TOKEN}` } }
  );

  const authorUrn = `urn:li:person:${linkedinUser.data.id}`;

  await axios.post(
    "https://api.linkedin.com/v2/ugcPosts",
    {
      author: authorUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text },
          shareMediaCategory: "IMAGE",
          media: [
            {
              status: "READY",
              description: { text: "Imagem ilustrativa do canal Hora do QA" },
              media: asset,
              title: { text: "Top 10 vídeos Hora do QA" }
            }
          ]
        }
      },
      visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
    },
    {
      headers: {
        Authorization: `Bearer ${LINKEDIN_TOKEN}`,
        "X-Restli-Protocol-Version": "2.0.0",
        "Content-Type": "application/json"
      }
    }
  );

  console.log("✅ Post com imagem publicado com sucesso!");
}

// 8️⃣ Função principal
async function run() {
  try {
    const topVideos = await getTopVideos();
    const postText = buildPost(topVideos);

    const { uploadUrl, asset } = await registerImageUpload();
    await uploadImage(uploadUrl, IMAGE_PATH);

    await postOnLinkedInWithImage(postText, asset);
  } catch (error) {
    console.error("❌ Erro:", error.response?.data || error.message);
  }
}

run();