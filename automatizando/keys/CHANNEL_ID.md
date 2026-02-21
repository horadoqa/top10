

# 📌 Como pegar o CHANNEL_ID do seu canal

Vá em:

YouTube Studio → Configurações → Canal → Configurações avançadas

Ou acesse:

```
https://www.youtube.com/@horadoqa
```

Depois use este endpoint no navegador (substituindo pela sua chave):

```
https://www.googleapis.com/youtube/v3/channels?part=id&forUsername=horadoqa&key=SUA_API_KEY
```

Se for canal com @handle, pode usar:

```
https://www.googleapis.com/youtube/v3/channels?part=id&forHandle=horadoqa&key=SUA_API_KEY
```

---

# 🎯 Resumo do que você precisa

Você vai ter:

```bash
YOUTUBE_API_KEY=AIzaSy...
CHANNEL_ID=UCxxxxxxxxxxxx
```

---

Se você quiser, posso te explicar agora:

* 🔎 Como pegar apenas vídeos da última semana
* 📊 Como calcular crescimento semanal
* 🚀 Como evitar estourar limite da API (quota)
* 💰 Ou como monitorar uso da API

Qual próximo passo você quer?
