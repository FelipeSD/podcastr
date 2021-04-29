# Meu registro de aprendizagem
### Dia 1
Saber que iremos usar o Gatsby junto com o Next neste projeto já me deixou bem animado para aprender sobre essas 2
tecnologias. Utilizando SSR (Server side rendering) e SSG (Static site generation) para deixar o projeto otimizado para SEO e, além de tudo, performático.

### Dia 2
Estilização com scss no next utilizando em forma de módulos. Nome dos arquivos deve conter *.module.scss.

A função getStaticProps irá gerar um SSG (site estático) de acordo com a propriedade revalidate (passado em segundos), 
tudo que for acessado durante cada intervalo, a mesma página será entregue para os usuários.

O atributo props do objeto retornado pela função getStaticProps, e getServerSideProps (usado para gerar SSR) será os dados que estarão disponíveis na parte do cliente durante o desenvolvimento dos componentes JSX da página.


### Dia 3
Converter as durações de segundos para hora:minuto:segundo, de uma forma simplificada.

Fazer a manipulação dos dados do server.json para que a página mostre no formato indicado, antes mesmo que a propriedade esteja disponível no componente, ou seja, a manipulação é feita no servidor.

Conheci uma propriedade interessante do css que insere reticências (...) automaticamente quando acontece um overflow
´´´
overflow: hidden;
text-overflow: ellipsis; // insere reticencias quando passa o overflow
´´´

O Next trabalha com File System Rooting, significa que as rotas são feitas de acordo com os arquivos que existem em um diretório, que nesse caso é o pages. São os arquivos que formam a rota da aplicação. 

A tag Link oferecido pelo next tras o mesmo funcionamento de SPA, substituindo apenas alguns componentes (e não a página inteira) dentro de um SSG ( página estática que são dinâmicas ?)


Converter texto com tags html ser interpretado no react a renderizar como Html passando uma propriedade
dangerouslySetInnetHtml

### Dia 4
Toda rota que esteja usando geração estática (getStaticProps) e que tenha parametros dinamicos, deve implementar a função getStaticPaths.


´´´
<div 
    className={styles.description} 
    dangerouslySetInnetHtml={{ __html: episode.description}} 
/>
´´´
---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!