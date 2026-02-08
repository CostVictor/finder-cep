# Finder CEP

Buscador de CEPs simples e direto. Digite um CEP válido e o app consulta a API
do ViaCEP, exibe os dados do endereço e mostra o local no Google Maps.

## Demo local

- Abra o arquivo `index.html` no navegador.
- Digite um CEP com 8 números (ex.: `01001000`).

## Funcionalidades

- Busca de CEP com validação básica no input.
- Exibição de DDD, logradouro, bairro, cidade, estado e região.
- Mensagens de carregamento, sucesso e erro.
- Mapa incorporado do Google Maps com base no resultado.
- Botão para limpar o formulário e o resultado.

## Tecnologias

- HTML, CSS e JavaScript (vanilla)
- API ViaCEP: `https://viacep.com.br/ws/`
- Google Maps Embed

## Estrutura do projeto

- `index.html`: estrutura e layout do app
- `styles.css`: estilos e responsividade
- `script.js`: lógica de busca e renderização

## Observações

- O campo aceita apenas 8 dígitos.
- Caso o CEP não exista, o app mostra a mensagem de erro.

## Autor

Victor Gabriel - `https://github.com/CostVictor`
