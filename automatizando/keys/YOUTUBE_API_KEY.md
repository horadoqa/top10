# 🚀 Passo a passo para gerar sua YOUTUBE_API_KEY

## 1️⃣ Acesse o Google Cloud Console

👉 [https://console.cloud.google.com/](https://console.cloud.google.com/)

Faça login com **a mesma conta do seu canal** (Hora do QA).

---

## 2️⃣ Criar um Projeto

No topo da tela:

* Clique em **Selecionar projeto**
* Clique em **Novo Projeto**
* Nomeie como:

```
hora-do-qa-youtube-api
```

* Clique em **Criar**

---

## 3️⃣ Ativar a YouTube Data API v3

Vá em:

**APIs e Serviços → Biblioteca**

Pesquise por:

```
YouTube Data API v3
```

Clique nela e depois clique em **Ativar**.

---

## 4️⃣ Criar a API Key

Agora vá em:

**APIs e Serviços → Credenciais**

Clique em:

👉 **Criar Credenciais**
👉 **Chave de API**

Pronto 🎉
Sua `YOUTUBE_API_KEY` será gerada.

Ela vai parecer algo assim:

```
AIzaSyAxxxxxxxxxxxxxxxxxxxxxxxx
```

---

# 🔐 ⚠️ MUITO IMPORTANTE (segurança)

Clique em **Restringir chave** e faça:

### 1️⃣ Restrição de API

Selecione:

* ✅ YouTube Data API v3

### 2️⃣ Restrição de aplicação (opcional)

Se for usar só no backend:

* Pode deixar sem restrição
  OU
* Restringir por IP (se rodar em servidor fixo)

Nunca exponha essa chave no frontend.

---