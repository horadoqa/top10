Perfeito 👌
Vou montar para você um **fluxo completo do n8n**, pronto para importar, que:

1. Roda toda segunda-feira
2. Busca os vídeos do seu canal no YouTube
3. Pega os 10 mais vistos
4. Monta o texto do post
5. Publica automaticamente no LinkedIn

---

# 🔐 Antes de importar (você vai precisar)

### 1️⃣ YouTube API Key

Criar no Google Cloud:

* Ativar **YouTube Data API v3**
* Gerar API Key

### 2️⃣ LinkedIn OAuth2

Criar app em:

* [https://www.linkedin.com/developers/](https://www.linkedin.com/developers/)
* Permissões:

  * `w_member_social`
  * `r_liteprofile`

No n8n você criará uma credencial OAuth2 do LinkedIn.

---

# 📦 Fluxo completo para importar no n8n

Copie tudo abaixo → n8n → Import Workflow → Cole o JSON.

Depois só ajustar:

* `YOUR_CHANNEL_ID`
* `YOUR_YOUTUBE_API_KEY`
* Selecionar sua credencial do LinkedIn

---

```json
{
  "name": "Top 10 YouTube → LinkedIn",
  "nodes": [
    {
      "parameters": {
        "triggerTimes": {
          "item": [
            {
              "mode": "everyWeek",
              "weekday": "1",
              "hour": 9,
              "minute": 0
            }
          ]
        }
      },
      "id": "Cron",
      "name": "Toda Segunda 09h",
      "type": "n8n-nodes-base.cron",
      "typeVersion": 1,
      "position": [200, 300]
    },
    {
      "parameters": {
        "url": "https://www.googleapis.com/youtube/v3/search",
        "method": "GET",
        "responseFormat": "json",
        "queryParametersUi": {
          "parameter": [
            { "name": "part", "value": "snippet" },
            { "name": "channelId", "value": "YOUR_CHANNEL_ID" },
            { "name": "maxResults", "value": "50" },
            { "name": "order", "value": "viewCount" },
            { "name": "type", "value": "video" },
            { "name": "key", "value": "YOUR_YOUTUBE_API_KEY" }
          ]
        }
      },
      "id": "YouTube",
      "name": "Buscar Vídeos YouTube",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4,
      "position": [450, 300]
    },
    {
      "parameters": {
        "functionCode": "const videos = items[0].json.items.slice(0,10);\nreturn videos.map((v, i) => {\n  return {\n    json: {\n      position: i + 1,\n      title: v.snippet.title,\n      url: `https://youtube.com/watch?v=${v.id.videoId}`\n    }\n  }\n});"
      },
      "id": "Top10",
      "name": "Selecionar Top 10",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [700, 300]
    },
    {
      "parameters": {
        "functionCode": "let texto = \"🎬 TOP 10 vídeos mais assistidos da semana no canal @horadoqa 👇\\n\\n\";\n\nitems.forEach(item => {\n  texto += `${item.json.position}. ${item.json.title}\\n`;\n  texto += `${item.json.url}\\n\\n`;\n});\n\ntexto += \"\\n#QA #Qualidade #Automacao #Testes\";\n\nreturn [{ json: { content: texto } }];"
      },
      "id": "MontarTexto",
      "name": "Montar Texto LinkedIn",
      "type": "n8n-nodes-base.function",
      "typeVersion": 1,
      "position": [950, 300]
    },
    {
      "parameters": {
        "resource": "post",
        "operation": "create",
        "text": "={{$json[\"content\"]}}"
      },
      "id": "LinkedIn",
      "name": "Publicar no LinkedIn",
      "type": "n8n-nodes-base.linkedIn",
      "typeVersion": 1,
      "position": [1200, 300],
      "credentials": {
        "linkedInOAuth2Api": {
          "id": "YOUR_LINKEDIN_CREDENTIAL_ID",
          "name": "LinkedIn OAuth2"
        }
      }
    }
  ],
  "connections": {
    "Toda Segunda 09h": {
      "main": [[{ "node": "Buscar Vídeos YouTube", "type": "main", "index": 0 }]]
    },
    "Buscar Vídeos YouTube": {
      "main": [[{ "node": "Selecionar Top 10", "type": "main", "index": 0 }]]
    },
    "Selecionar Top 10": {
      "main": [[{ "node": "Montar Texto LinkedIn", "type": "main", "index": 0 }]]
    },
    "Montar Texto LinkedIn": {
      "main": [[{ "node": "Publicar no LinkedIn", "type": "main", "index": 0 }]]
    }
  }
}
```

---

# 🚀 Depois de importar

### Ajustes obrigatórios:

1. Substituir `YOUR_CHANNEL_ID`
2. Substituir `YOUR_YOUTUBE_API_KEY`
3. Selecionar sua credencial do LinkedIn
4. Ativar o workflow

---

# 🔥 Versão mais profissional (recomendada)

Se quiser deixar mais estratégico, posso melhorar para:

* ✔️ Pegar estatísticas reais (usando endpoint `videos` com `statistics`)
* ✔️ Mostrar número de views no post
* ✔️ Mostrar crescimento da semana
* ✔️ Gerar imagem automática com ranking
* ✔️ Criar carrossel no LinkedIn
* ✔️ Postar também no Instagram ou Twitter

---

Se você quiser, me diz:

👉 Você quer pegar os **mais vistos de todos os tempos**
ou
👉 Os **mais vistos apenas da última semana**?

Isso muda um pouco a estratégia da API 😉
