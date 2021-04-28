# Meu registro de aprendizagem
### Dia 1
Saber que iremos usar o Gatsby junto com o Next neste projeto já me deixou bem animado para aprender sobre essas 2
tecnologias. Utilizando SSR (Server side rendering) e SSG (Static site generation) para deixar o projeto otimizado para SEO e, além de tudo, performático.

### Dia 2
Estilização com scss no next utilizando em forma de módulos. Nome dos arquivos deve conter *.module.scss.

A função getStaticProps irá gerar um SSG (site estático) de acordo com a propriedade revalidate (passado em segundos), 
tudo que for acessado durante cada intervalo, a mesma página será entregue para os usuários.

O atributo props do objeto retornado pela função getStaticProps, e getServerSideProps será os dados que estarão disponíveis na parte do cliente (no desenvolvimento dos componentes da página).

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