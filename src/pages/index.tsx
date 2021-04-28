// SPA
// SSR
// SSG

export default function Home(props) { // props vem do getServerSideProps  
  return (
    <h1>Index</h1>
  )
}

export async function getStaticProps(){ // é chamado pelo next antes de renderizar componente
  const response =  await fetch('http://localhost:3333/episodes')
  const data = await response.json();

  return {
    props: { // precisa ser sempre props no objeto
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}
