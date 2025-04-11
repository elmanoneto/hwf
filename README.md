# Hepta Weather Forecas

## Tomada de decisões

### Arquitetura

Separei a aplicação nas seguintes pastas:

- Components: componentes customizados para montar a aplicação.
- Styles: Utilizei essa pasta para colocar os arqivos de estilos customizados com Style Components + tailwind css. Usei uma biblioteca chamada `tailwind-styled-components` para usar o poder do tailwind junto com o style components, deixando assim o codigo mais enxuto e poderoso.
  **Nota**: Recentemente saiu uma noticia onde o criador do styled components não vai mais evoluir a biblioteca e ela estará apaenas em maintenance mode, então para projetos futuros e que tendem a escalar seria interessante procurar outras opções.
- Lib: Utilitários a partir de bibliotecas instaladas.
- Hooks: Hooks customizados.
- Helpers: Funções utilitarias.
- Constants: Valores que nao irao mudar.
- API: Arquivos para fazer consultas as APIs.

Além disso, em meus projetos venho utilizando a abordagem **Component Composition**, coloquei um exemplo de seu funcionamento no componente `Forecast`.

Tambem utilizei a biblioteca de prettier para manter uma qualidade minima do codigo e criei uma arquivo de settings na pasta `.vscode` para manter padronização no codigo.

### Funcionamento

Na pagina principal da aplicação eu tenho uma condicional onde vai ser decidido se a aplicação renderizara a pagina a partir de uma localização que esteja na URL ou vai renderizar sem localização, pegando a geolocalizacao atual do usuario. Além disso, eu faço um prefetch no servidor, para que a pagina seja entregue ja com um conteudo e carregue mais rapido para o usuario final.

No componente de search, eu pego as coordenadas atraves de uma api e coloco no cache, alem de invalidar a query de weather, assim, no componente principal é feito um refetch atualizando os dados em tela.

### Testes

Testes unitarios com Jest e Testing library.

## Pontos de melhoria

- Melhorar cobertura de Testes
- Melhorar tipagem, principalmente de retornos da API.
- Suspense API para carregamento async, e evitar shift layout.
- Melhorar os arquivos de acesso a API, criando classes e deixando o código mais modular, profissional e de fácil leitura.
- Melhorar a componenteizacao, alguns componentes html estao soltos com classes do tailwind, seria ideal transforma-los em componentes react/styled components para ficar mais reutilizaveis e mais facil de ler.
- Entender melhor os retornos da API de clima, por exemplo, se voce pesquisar por Groelandia, algum dia pode estar com temperatura negativa mas o icone esta como dia ensolarado, pois fiz apenas uma validação basica.
- Remover warnings dos testes.
- Usar uma ferramenta pre-commit (husky) caso o projeto va para producao.

## Executando o projetos

Crie um arquivo chamado `.env.local` na raiz do projeto e coloque as seguintes variaveis de ambiente:

```
NEXT_PUBLIC_WEATHERBIT_KEY=510a0c10e7094bc981615941df2e6788
NEXT_PUBLIC_GOOGLE_KEY=AIzaSyC2n0o8PRDusVeC7DfnC7SS8TIgdnPEBpI
```

Para executar basta rodar os comandos: `npm install && npm run dev`
