# Automatizando a publicação no linkedin

## 🚀 Automatizar com GitHub Actions

Requisitos:

* Um script em Node.js ou Python
* Um workflow agendado (cron)
* Chamaria:

  * YouTube API
  * LinkedIn API

---

## Exemplo de workflow (.github/workflows/top10.yml)

```yaml
name: Post Top 10 YouTube

on:
  schedule:
    - cron: '0 12 * * 1'  # Toda segunda às 12h UTC

jobs:
  post:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run script
        run: node index.js
        env:
          YOUTUBE_API_KEY: ${{ secrets.YOUTUBE_API_KEY }}
          LINKEDIN_TOKEN: ${{ secrets.LINKEDIN_TOKEN }}
```

---

## index.js (exemplo simples)

```javascript
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
```
