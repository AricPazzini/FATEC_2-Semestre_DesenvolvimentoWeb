# Resumo pra prova — HTML e CSS

**Desenvolvimento Web · ISW082 · Fatec**
Base: o projeto `projeto-eventos-2-ciclo` do professor + a atividade que ele disse ser parecida com a prova.

---

## 1. O esqueleto de todo arquivo HTML

```html
<!DOCTYPE html>                  ← SEMPRE a 1ª linha. Avisa: "isto é HTML5"
<html lang="pt-BR">              ← idioma da página
<head>                           ← parte INVISÍVEL: configurações
    <meta charset="UTF-8">       ← faz os acentos funcionarem
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  ← adapta ao celular
    <title>Página de Eventos</title>                     ← texto da aba do navegador
    <link rel="stylesheet" href="./assets/css/styles.css">  ← LIGA O CSS
</head>
<body>                           ← parte VISÍVEL: tudo que aparece na tela
    ...
    <script src="./js/home.js"></script>   ← JS no FINAL do body
</body>
</html>
```

- **`<!DOCTYPE html>` vem antes de tudo**, até antes do `<html>`.
- **O CSS se liga com `<link rel="stylesheet" href="...">`, dentro do `<head>`.**
- **O JavaScript se liga com `<script src="...">`**, e o professor põe no fim do `<body>` pra rodar só depois que a página carregou.

---

## 2. Tags semânticas — a "planta baixa" da página

Tag semântica é a que **diz o que o bloco é**, não só como ele aparece. O projeto do professor é montado assim:

```html
<nav class="header-menu">   → menu de navegação (logo + links)
<header class="hero">       → cabeçalho visível: título, frase, busca
<section class="events">    → seção de conteúdo: filtros + cards
<footer class="footer">     → rodapé: "© 2026 Eventos Fatec"
```

| Tag | O que é |
|---|---|
| `<header>` | Cabeçalho **visível** do topo (nome do site, título) |
| `<nav>` | Grupo de **links de navegação** (o menu) |
| `<main>` | Conteúdo principal da página (só um por página) |
| `<section>` | Um bloco/capítulo do conteúdo |
| `<article>` | Conteúdo que faz sentido sozinho (post, notícia, card) |
| `<footer>` | Rodapé |

> ⚠️ **`<head>` ≠ `<header>`.** O `<head>` é configuração invisível. O `<header>` é o topo que aparece na tela.

---

## 3. Link ou botão? `<a>` × `<button>`

| Use | Quando |
|---|---|
| `<a href="evento.html">` | Pra **ir pra outra página** (navegar) |
| `<button>` | Pra uma **ação na própria página** (filtrar, abrir menu, enviar) |

**No projeto:** o "Ver detalhes" de cada card é um `<a>` que o JavaScript cria sozinho:

```javascript
const link = document.createElement("a");
link.href = "evento.html?id=" + evento.id;   // leva pra página do evento
link.textContent = "Ver detalhes";
```

O `?id=workshop-1` no fim do endereço diz **qual** evento abrir.

---

## 4. Box Model — toda caixa tem 4 camadas

De **dentro pra fora**:

```
┌─────────────── margin ───────────────┐   espaço EXTERNO (afasta dos vizinhos)
│  ┌──────────── border ────────────┐  │   a borda
│  │  ┌───────── padding ────────┐  │  │   espaço INTERNO (entre borda e conteúdo)
│  │  │        CONTEÚDO          │  │  │   o texto / imagem
│  │  └──────────────────────────┘  │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

- **padding = dentro** da borda
- **margin = fora** da borda

**No projeto**, a 1ª regra do CSS é:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;   /* a largura passa a INCLUIR padding e borda */
}
```

Sem o `border-box`, uma caixa de `width: 300px` com `padding: 20px` ficaria com 340px na tela. Com ele, fica com 300px mesmo.

---

## 5. Flexbox × Grid — as duas formas de organizar

Os dois são ligados pela **mesma propriedade: `display`**.

| | Flexbox | Grid |
|---|---|---|
| Liga com | `display: flex;` | `display: grid;` |
| Organiza em | **1 direção** (linha OU coluna) | **2 direções** (linhas E colunas) |
| No projeto | O **menu** (logo e links lado a lado) | A **lista de cards** de eventos |

### Flexbox — o menu

```css
.header-menu {
    display: flex;             /* filhos lado a lado */
    justify-content: center;   /* centraliza na HORIZONTAL */
    align-items: center;       /* centraliza na VERTICAL */
    gap: 15px 30px;            /* espaço ENTRE os itens */
    flex-wrap: wrap;           /* se não couber, quebra pra linha de baixo */
}
```

- `justify-content` → alinha no **eixo principal** (na linha, é a horizontal)
- `align-items` → alinha no **eixo cruzado** (na linha, é a vertical)
- `flex-direction: column` → empilha em coluna em vez de linha

### Grid — os cards

```css
.list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 22px;
}
```

Lendo essa linha em português: *"crie **quantas colunas couberem**, cada uma com **no mínimo 280px**, e divida o espaço que sobrar **igualmente** entre elas."* No computador dá 3 ou 4 cards por linha; no celular, 1. Sem media query nenhuma.

- `fr` = uma **fração** do espaço livre
- `repeat(3, 1fr)` = 3 colunas iguais

---

## 6. `:hover` — quando o mouse passa por cima

`:hover` é uma **pseudo-classe**: aplica um estilo só enquanto o cursor está sobre o elemento.

```css
.botao:hover {
    background-color: var(--pink-secondary);
}
```

**No projeto** ele escreve de um jeito mais novo, com CSS aninhado:

```css
.link {
    color: var(--text-gray);
    &:hover { color: var(--text-white); }   /* & = "este próprio .link" */
}
```

É a mesma coisa que `.link:hover { ... }`.

---

## 7. Mobile-first e media queries

**Media query** = um bloco de CSS que só vale em certo tamanho de tela.

| Abordagem | CSS base pensa em... | A media query usa | Pra... |
|---|---|---|---|
| **Mobile-first** | **celular** | `min-width` | **acrescentar** coisas em telas maiores |
| Desktop-first | computador | `max-width` | **ajustar** pra telas menores |

```css
/* MOBILE-FIRST: base = celular; a partir de 768px, ajusta pro desktop */
.cards { display: block; }
@media (min-width: 768px) {
    .cards { display: grid; }
}
```

> ⚠️ **PEGADINHA:** o projeto do professor é **desktop-first**. A única media query dele é:
> ```css
> @media (max-width: 720px) { ... }   ← "até 720px" = ajusta PRO CELULAR
> ```
> Se cair na prova "o que é mobile-first", **responda a definição** (celular primeiro, depois adapta pra telas maiores) — não se guie pelo código do projeto.

---

## 8. Variáveis CSS

O professor guarda as cores num lugar só:

```css
:root {
    --pink-primary: #e20543;
    --bg-dark: #111;
}

.botao { background-color: var(--pink-primary); }
```

- Cria com **`--nome`** dentro de `:root`
- Usa com **`var(--nome)`**
- Troca a cor uma vez e muda o site inteiro

---

## 🎯 Pegadinhas — como as alternativas erradas enganam

Na atividade, **metade das alternativas erradas é sintaxe inventada**. Se você nunca viu, desconfie.

| Pergunta sobre | ✅ Certo | ❌ Não existe / é outra coisa |
|---|---|---|
| Cabeçalho visível | `<header>` | `<head>` é invisível · `<footer>` é rodapé · `<h6>` é título pequeno |
| Menu | `<nav>` | `<link>` liga CSS · `<main>` é o conteúdo principal |
| 1ª linha | `<!DOCTYPE html>` | `<html>` vem **depois** dele |
| Ligar o CSS | `<link rel="stylesheet" href>` | `<style src>` não existe · `<script>` é pra JS · `<css file>` não existe |
| Espaço interno | `padding` | `margin` é **externo** |
| Ativar Grid | `display: grid;` | `grid: on` · `layout: grid` · `position: grid` — inventados |
| Ativar Flex | `display: flex;` | `flex: true` · `align: flex` — inventados · `display: block` empilha |
| Mouse em cima | `:hover` | `:click` · `:mouse` · `:over` — inventados |
| Mobile-first | CSS pensando no celular primeiro | **Não** é fazer app · **não** é só celular |
| Ir pra outra página | `<a href>` | `<button>` é ação na página · `<link>` não é clicável |

**Regra de ouro:** *layout sempre muda pelo `display:`* — `display: flex`, `display: grid`, `display: block`, `display: none`.

---

# Glossário

## HTML

| Termo | O que é |
|---|---|
| **Tag** | A marcação entre `< >`. Ex: `<p>` |
| **Elemento** | A tag completa com o conteúdo: `<p>Olá</p>` |
| **Atributo** | Informação extra dentro da tag: `href`, `class`, `src` |
| **Semântica** | Usar a tag que descreve o que o bloco **é** (`<nav>`, `<footer>`) |
| `<!DOCTYPE html>` | 1ª linha; declara HTML5 |
| `<html lang="pt-BR">` | Envolve tudo; `lang` diz o idioma |
| `<head>` | Configurações invisíveis |
| `<meta charset="UTF-8">` | Faz os acentos funcionarem |
| `<meta name="viewport">` | Faz a página se adaptar ao celular |
| `<title>` | Texto da aba do navegador |
| `<link>` | Liga um arquivo externo — no curso, o CSS |
| `<script src>` | Liga um arquivo JavaScript |
| `<body>` | Tudo que aparece na tela |
| `<header>` | Cabeçalho visível do topo |
| `<nav>` | Menu / grupo de links de navegação |
| `<main>` | Conteúdo principal da página |
| `<section>` | Seção / bloco do conteúdo |
| `<article>` | Conteúdo independente (post, card) |
| `<footer>` | Rodapé |
| `<h1>` a `<h6>` | Títulos, do maior (`h1`) ao menor (`h6`) |
| `<p>` | Parágrafo |
| `<span>` | Pedaço de texto sem significado próprio, pra estilizar (o destaque rosa do título) |
| `<a href="...">` | Link — leva pra outra página |
| `<button>` | Botão — ação na própria página |
| `<img src alt>` | Imagem. `src` = onde está · `alt` = texto alternativo (acessibilidade) |
| `<ul>` / `<ol>` / `<li>` | Lista com bolinha / lista numerada / item da lista |
| `<input>` | Campo pra digitar |
| `placeholder` | Texto cinza de exemplo dentro do `<input>` |
| `class` | Nome de grupo, **pode repetir**. No CSS: `.nome` |
| `id` | Nome único, **não repete**. No CSS: `#nome` · o JS usa pra achar o elemento |
| `data-*` | Atributo de dado próprio pro JS. Ex: `data-categoria="Workshop"` |
| `?id=` na URL | *Query string*: passa informação pra próxima página |

## CSS

| Termo | O que é |
|---|---|
| **Seletor** | Quem recebe o estilo: `p`, `.classe`, `#id`, `*` |
| **Propriedade** | O que muda: `color`, `padding`, `display` |
| **Valor** | Como muda: `red`, `20px`, `flex` |
| `*` | Seletor universal: **todos** os elementos |
| `:root` | A raiz da página; onde se declaram as variáveis |
| `--nome` | Variável CSS |
| `var(--nome)` | Usa uma variável |
| **Box Model** | Toda caixa = conteúdo + padding + border + margin |
| `padding` | Espaço **interno** |
| `margin` | Espaço **externo** |
| `border` | Borda |
| `border-radius` | Arredonda os cantos |
| `box-sizing: border-box` | Largura passa a incluir padding e borda |
| `display` | Define **como** o elemento se organiza |
| `display: block` | Ocupa a linha inteira, empilha |
| `display: none` | Esconde |
| `display: flex` | Liga o Flexbox: filhos em linha (ou coluna) |
| `justify-content` | Alinha no eixo principal (horizontal, numa linha) |
| `align-items` | Alinha no eixo cruzado (vertical, numa linha) |
| `flex-direction` | Direção: `row` (linha) ou `column` (coluna) |
| `flex-wrap: wrap` | Deixa quebrar pra linha de baixo |
| `gap` | Espaço **entre** os itens (flex e grid) |
| `display: grid` | Liga o Grid: linhas **e** colunas |
| `grid-template-columns` | Define as colunas do grid |
| `fr` | Fração do espaço livre |
| `repeat()` | Repete colunas: `repeat(3, 1fr)` |
| `minmax(280px, 1fr)` | Mínimo 280px, máximo uma fração |
| `auto-fill` | Cria quantas colunas couberem |
| **Pseudo-classe** | Estado do elemento, com `:` — `:hover`, `:focus` |
| `:hover` | Enquanto o mouse está em cima |
| `&` | No CSS aninhado, "o próprio elemento" |
| **Media query** | `@media (...)` — CSS que só vale em certo tamanho de tela |
| `min-width` | "A partir de" — usado no **mobile-first** |
| `max-width` | "Até" — usado no **desktop-first** |
| **Mobile-first** | CSS base pro celular, media queries acrescentam pro desktop |
| **Responsivo** | Site que se adapta a qualquer tamanho de tela |
| `px` | Pixel, medida fixa |
| `%` | Porcentagem do elemento pai |

## JavaScript (o básico que aparece no projeto)

| Termo | O que é |
|---|---|
| **DOM** | A página vista pelo JavaScript, como uma árvore de elementos |
| `document.createElement("a")` | Cria um elemento novo pelo JS |
| `document.getElementById("x")` | Acha o elemento com `id="x"` |
| `.textContent` | O texto dentro do elemento |
| `.href` | O endereço de um link |
