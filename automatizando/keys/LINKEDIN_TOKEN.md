# 1️⃣ Crie um aplicativo no LinkedIn Developers

1. Acesse o [LinkedIn Developers](https://www.linkedin.com/developers/apps).
2. Clique em **“Create App”**.
3. Preencha:

   * Nome do aplicativo
   * Empresa ou desenvolvedor responsável
   * URL do site do aplicativo
   * Logo (opcional, mas exigido)
4. Salve o aplicativo.

Após criar, você terá:

* **Client ID**
* **Client Secret**

Esses dados são essenciais para gerar o token.

---

## 2️⃣ Configure permissões (Scopes)

No aplicativo, vá em **Auth → OAuth 2.0 settings** e adicione os **scopes** que precisa, por exemplo:

* `r_liteprofile` → acesso ao perfil básico
* `r_emailaddress` → acesso ao e-mail
* `w_member_social` → postar conteúdos

**Redirect URL:** Adicione a URL para onde o LinkedIn vai enviar o código de autorização (pode ser temporária, como `http://localhost:3000` durante testes).

---

## 3️⃣ Gere o código de autorização

Construa uma URL no navegador:

```
https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=SEU_CLIENT_ID&redirect_uri=SEU_REDIRECT_URI&scope=r_liteprofile%20r_emailaddress%20w_member_social
```

* Troque `SEU_CLIENT_ID` pelo ID do app.
* Troque `SEU_REDIRECT_URI` pelo URL cadastrado.
* Ajuste os scopes conforme necessário (espaços são substituídos por `%20`).

Ao acessar, você será redirecionado para o **redirect URI** com um parâmetro `code`. Esse `code` é temporário e serve para trocar pelo token.

---

## 4️⃣ Troque o código pelo token

Faça uma requisição POST para:

```
https://www.linkedin.com/oauth/v2/accessToken
```

Com os parâmetros:

* `grant_type=authorization_code`
* `code=SEU_CODIGO_OBTIDO`
* `redirect_uri=SEU_REDIRECT_URI`
* `client_id=SEU_CLIENT_ID`
* `client_secret=SEU_CLIENT_SECRET`

Exemplo usando **curl**:

```bash
curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
  -d grant_type=authorization_code \
  -d code=SEU_CODIGO_OBTIDO \
  -d redirect_uri=SEU_REDIRECT_URI \
  -d client_id=SEU_CLIENT_ID \
  -d client_secret=SEU_CLIENT_SECRET
```

A resposta será algo assim:

```json
{
  "access_token": "AQXyz123abc...",
  "expires_in": 5184000
}
```

O valor em `"access_token"` é o seu **LINKEDIN_TOKEN**.

---

## 5️⃣ Observações importantes

* O token tem validade (ex.: 60 dias para tokens padrão). Depois, você precisa renovar.
* Não compartilhe o token publicamente.
* Para automação contínua, considere usar **refresh tokens** se disponíveis.

---

Se você quiser, posso criar um **exemplo completo em Python** que gera o `LINKEDIN_TOKEN` automaticamente, já pronto para usar em APIs do LinkedIn. Isso te economiza todo o processo manual.

Quer que eu faça isso?
