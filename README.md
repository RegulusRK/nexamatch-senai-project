# NexaMatch

Projeto acadêmico de um analisador de compatibilidade entre perfis e vagas de tecnologia.

## Como o site funciona

1. Na primeira utilização, a pessoa informa o nome e suas competências.
2. O perfil é salvo apenas no `localStorage` do próprio navegador.
3. Nas próximas análises, basta colar os requisitos da vaga.
4. O resultado é guardado temporariamente no `sessionStorage` para ser exibido em `resultado.html`.

Não existe cadastro, servidor, banco de dados ou instalação pelo npm nesta versão.

## Estrutura

```text
nexamatch/
├── README.md
├── index.html
├── analisar.html
├── resultado.html
├── style.css
├── script.js
├── matcher.js 
└── images/
```

## Sua parte: criar `public/matcher.js`

O arquivo deve disponibilizar um objeto global chamado `NexaMatcher` com uma função `analyze`:

```js
window.NexaMatcher = {
  analyze(candidateSkills, jobDescription) {
    // Sua lógica será construída aqui.
  }
};
```

A função receberá:

- `candidateSkills`: texto com as competências salvas no perfil;
- `jobDescription`: requisitos ou descrição da vaga.

Ela deverá retornar:

```json
{
  "score": 67,
  "level": "Compatibilidade moderada",
  "message": "Você já possui uma base relevante para esta vaga.",
  "matchedSkills": ["javascript", "node.js", "git", "mysql"],
  "missingSkills": ["docker", "testes automatizados"],
  "totalRequired": 6
}
```

## Etapas sugeridas para o algoritmo

1. Criar uma lista de palavras-chave de tecnologia.
2. Normalizar maiúsculas, minúsculas e acentos.
3. Descobrir quais palavras-chave aparecem na vaga.
4. Separar as encontradas e ausentes no perfil.
5. Calcular: `encontradas / requisitos identificados × 100`.
6. Definir o nível e a mensagem conforme a porcentagem.

## Como abrir

Abra a pasta `public` com a extensão Live Server do VS Code. Não use `npm install` ou `npm start`.

## Critério sugerido para os níveis

| Pontuação | Nível |
| --- | --- |
| 0–39% | Compatibilidade inicial |
| 40–69% | Compatibilidade moderada |
| 70–84% | Boa compatibilidade |
| 85–100% | Alta compatibilidade |

## Créditos das fotografias

Fotos gratuitas obtidas no Pexels:

- Sora Shimazaki — entrevista e currículo.
- Christina Morillo — colaboração em programação.
- Lukas Blazek — currículo, notebook e gráficos.
- Resume Genius — resultado profissional.
- cottonbro studio — equipe de desenvolvimento.

O resultado é apenas orientativo. A pontuação não representa garantia de contratação ou reprovação.
