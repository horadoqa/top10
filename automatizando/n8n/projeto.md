# Automatizando a publicação no linkedin

- n8n
- GitHub Actions
- YouTube Data API v3

---

## ✅ Opção 1 — Automatizar com **n8n** (mais simples e visual)

### 🔹 O que você vai precisar

* API Key do **YouTube Data API v3**
* App no **LinkedIn Developers** (para postar automaticamente)
* n8n rodando (cloud ou self-hosted)

---

### 🧩 Fluxo no n8n

#### 1️⃣ Cron Node

* Agendar para rodar toda **segunda-feira**
* Ex: 09:00

---

#### 2️⃣ HTTP Request → YouTube API

Endpoint:

```
GET https://www.googleapis.com/youtube/v3/search
```

Parâmetros:

```
part=snippet
channelId=SEU_CHANNEL_ID
maxResults=50
order=viewCount
type=video
key=SUA_API_KEY
```

⚠️ Isso já retorna ordenado por visualizações.

Se quiser garantir, pode usar um **Function Node** para ordenar manualmente e pegar só os 10 primeiros:

```javascript
return items
  .sort((a, b) => b.json.statistics.viewCount - a.json.statistics.viewCount)
  .slice(0, 10);
```

---

#### 3️⃣ Montar o texto do LinkedIn (Function Node)

Exemplo:

```javascript
let texto = "🎬 TOP 10 vídeos mais assistidos do @horadoqa no YouTube 👇\n\n";

items.forEach((item, index) => {
  texto += `${index + 1}. ${item.json.snippet.title}\n`;
  texto += `🔗 https://youtube.com/watch?v=${item.json.id.videoId}\n\n`;
});

return [{ json: { content: texto } }];
```

---

#### 4️⃣ LinkedIn Node → Create Post

Você conecta usando OAuth2 e publica no seu perfil ou página.

---

### ✅ Vantagens do n8n

* Interface visual
* Fácil manutenção
* Não precisa escrever muita infra
* Pode expandir depois (ex: mandar também por email)

---

