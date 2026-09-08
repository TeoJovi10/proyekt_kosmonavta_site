# Proyekt Kosmonavta

Site em português com HTML, CSS e JavaScript puros, sem dependências ou frameworks. Abra `index.html` diretamente no navegador.

- `index.html`: conteúdo, navegação e fontes históricas.
- `styles.css`: layout responsivo e tokens da paleta Resurrect 64 de Kerrie Lake. Branco puro apenas nos espaços reservados.
- `script.js`: seleção das seis fases, menu móvel e animações de entrada com opção de pausa e respeito à redução de movimento.

## Adicionar imagens

Os espaços de imagem estão propositalmente brancos. Crie uma pasta `assets` e, no elemento `figure` correspondente de `index.html`, substitua os elementos `.slot-label` e `.slot-corner` por `<img src="assets/capa.webp" alt="Descrição da cena do jogo">`. Preserve as classes do `figure` para manter as dimensões. Para gameplay, preserve também o `figcaption`.

Para imagens diferentes por fase, adicione um campo `image` e um campo `alt` aos objetos de `phases` em `script.js` e atualize o `src` e o `alt` de uma imagem dentro de `.phase-image` em `selectPhase`. Atualmente nenhuma imagem é carregada e não há arquivos ausentes sendo requisitados.

O nome do projeto foi inferido do diretório. O site apresenta o jogo; não inclui uma versão jogável. As fontes sobre cientistas estão vinculadas nas respectivas seções. A história alternativa está explicitamente separada da biografia real de Valentina.
