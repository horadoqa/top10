# Checklist semanal

Histórico de atualizações e procedimento para publicação semanal do **TOP 10 — Hora do QA**.

---

## \[Próxima publicação\]

### 1\. Atualizar os dados

Abrir o arquivo:

```
data/semanas.json
```

A semana que atualmente está em:

```
"semanaAtual"
```

 deve passar a ser a:

```
"semanaAnterior"
```

 Depois, criar os dados da nova semana em:

```
"semanaAtual"
```

 Exemplo:

```
SEMANA ANTERIOR
        ↓
Semana atual da semana passada

SEMANA ATUAL
        ↓
Nova semana
```

---

### 2\. Conferir os 10 vídeos

Atualizar os 10 vídeos da nova semana com:

- Posição no ranking
- Número de visualizações
- Título
- URL do vídeo

 Cada vídeo deve possuir:

```
{
    "rank": 1,
    "views": 2912,
    "title": "Título do vídeo",
    "url": "https://www.youtube.com/watch?v=..."
}
```

---

### 3\. Conferir as posições

Comparar o ranking da semana anterior com o ranking atual.

Exemplo:

```
Playwright
#1 → #1

Testes Manuais - Login
#10 → #8

Robot Framework
#8 → #10
```

O sistema calcula automaticamente a movimentação:

```
↑ Subiu
↓ Desceu
— Manteve
```

Não é necessário alterar o código JavaScript para isso.

---

### 4\. Conferir os links

 Verificar se os links dos vídeos estão corretos.

 Os links devem apontar para os respectivos vídeos no YouTube.

---

### 5\. Executar o projeto localmente

Abrir o projeto utilizando um servidor local.

Recomendação:

**VS Code + Live Server**

 Abrir:

```
index.html
```

 e verificar se o dashboard está carregando normalmente.

---

### 6\. Conferir o dashboard

Antes de publicar, verificar:

- [ ] Logo do Hora do QA
- [ ] Título TOP 10
- [ ] Total de visualizações
- [ ] Percentual de crescimento
- [ ] Gráfico
- [ ] Ranking
- [ ] Crescimento de cada vídeo
- [ ] Mudança de posição
- [ ] Links dos vídeos
- [ ] Layout desktop
- [ ] Layout mobile

---

### 7\. Verificar o gráfico

Confirmar se as duas séries estão aparecendo:

```
Semana anterior
Semana atual
```

Verificar também se os valores apresentados no gráfico correspondem aos valores do `semanas.json`.

---

### 8\. Testar no celular

Abrir a página em uma tela pequena e verificar:

- Header
- Logo
- Cards
- Gráfico
- Ranking
- Rolagem horizontal da tabela, caso necessário

---

### 9\. Salvar a alteração no Git

Depois de validar a página:

```
git status
```

 Verificar os arquivos modificados.

 Adicionar as alterações:

```
git add .
```

Criar o commit:

```
git commit -m "Atualiza TOP 10 - Semana XX"
```

 Exemplo:

```
git commit -m "Atualiza TOP 10 - Semana 03"
```

---

### 10\. Enviar para o repositório

Executar:

```
git push
```

 Se estiver utilizando uma branch específica:

```
git push origin main
```

---

### 11\. Publicação

Caso o projeto esteja configurado para publicação automática, aguardar o processo de deploy.

 Depois, acessar a URL pública do TOP 10 e verificar novamente.

---

### 12\. Validação final

Na página publicada, conferir:

```
✓ Página carregando
✓ Logo correta
✓ Dados atualizados
✓ Gráfico correto
✓ Ranking correto
✓ Percentuais corretos
✓ Links funcionando
✓ Responsividade
```

Somente após essa validação considerar a publicação concluída.

---

# 📝 Exemplo de atualização semanal

 Supondo que atualmente tenhamos:

```
Semana anterior
01/09 → 07/09

Semana atual
08/09 → 14/09
```

 Na semana seguinte:

```
Semana anterior
08/09 → 14/09

Semana atual
15/09 → 21/09
```

O arquivo `data/semanas.json` deverá refletir essa mudança.

---

# 🔄 Fluxo semanal resumido

```
1. Consultar TOP 10 no YouTube
              ↓
2. Anotar visualizações
              ↓
3. Atualizar data/semanas.json
              ↓
4. Abrir página localmente
              ↓
5. Conferir gráfico
              ↓
6. Conferir ranking
              ↓
7. Testar desktop
              ↓
8. Testar mobile
              ↓
9. git add .
              ↓
10. git commit
              ↓
11. git push
              ↓
12. Conferir página publicada
              ↓
          ✅ PUBLICADO
```

---

# 📌 Regras importantes

### Não alterar o HTML para atualizar os números

Os dados semanais devem ficar exclusivamente em:

```
data/semanas.json
```

### Não alterar o JavaScript sem necessidade

Os arquivos:

```
js/app.js
js/chart.js
js/ranking.js
js/utils.js
```

 são responsáveis pelo processamento automático dos dados.

 Em uma atualização semanal normal, eles não precisam ser modificados.

### Manter os vídeos identificáveis

 O mesmo vídeo deve manter a mesma URL entre as semanas.

 Isso permite que o sistema compare automaticamente:

```
Semana anterior × Semana atual
```

 e calcule crescimento e mudança de posição.

---

 # 📅 Histórico de versões

 ## \[0.1.0\] — Primeira versão

- Criado dashboard TOP 10.
- Criado comparativo entre duas semanas.
- Adicionado gráfico com Chart.js.
- Adicionado ranking detalhado.
- Adicionado cálculo de crescimento.
- Adicionado cálculo de mudança de posição.
- Criado layout responsivo.
- Adicionada identidade visual do Hora do QA.
- Estrutura preparada para atualização semanal.

---

 ## 🚀 Próximas evoluções

 Possíveis melhorias futuras:

- [ ] Histórico de várias semanas
- [ ] Gráfico histórico
- [ ] Cadastro de novas semanas sem editar código
- [ ] Integração com YouTube Data API
- [ ] Atualização automática
- [ ] Exportação do TOP 10 como imagem
- [ ] Página de histórico
- [ ] Ranking geral dos vídeos
- [ ] Indicadores de maior crescimento
- [ ] Comparativo mensal

