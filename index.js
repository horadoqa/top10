const axios = require("axios");

async function run() {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/search",
    {
      params: {
        part: "snippet",
        channelId: "SEU_CHANNEL_ID",
        maxResults: 10,
        order: "viewCount",
        type: "video",
        key: process.env.YOUTUBE_API_KEY
      }
    }
  );

  const videos = response.data.items;

  let texto = "🎬 TOP 10 vídeos mais assistidos do @horadoqa 👇\n\n";

  videos.forEach((v, i) => {
    texto += `${i + 1}. ${v.snippet.title}\n`;
    texto += `https://youtube.com/watch?v=${v.id.videoId}\n\n`;
  });

  await axios.post(
    "https://api.linkedin.com/v2/ugcPosts",
    {
      // estrutura do post aqui
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.LINKEDIN_TOKEN}`
      }
    }
  );
}

run();