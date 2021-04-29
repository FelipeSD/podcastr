import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { api } from '../../services/api';
import { converDurationToTimeString } from '../../utils/convertDurationToTimeString';

import styles from './episode.module.scss';

type Episode = {
    id: string;      
    title: string;
    members: string;
    published_at: string;
    publishedAt: string;
    thumbnail: string,
    description: string;
    duration: number;
    durationAsString: string;
    url: string;
}

type EpisodeProps = {
    episode: Episode;
}

export default function Episode({episode}: EpisodeProps){
    const router = useRouter();
    
    // se estiver em fallback (página acessada que não foi gerada automaticamente, com falbback como true)
    if(router.isFallback){
        return <p>Carregando</p>
    }

    return (
        <div className={styles.episode}>
            <div className={styles.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar" />
                    </button>
                </Link>
                <Image
                    width={700}                
                    height={160}
                    src={episode.thumbnail}
                    objectFit="cover"
                />
                <button type="button">
                    <img src="/play.svg" alt="Tocar episódio"/>
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>{episode.publishedAt}</span>
                <span>{episode.durationAsString}</span>
            </header>

            <div 
                className={styles.description} 
                dangerouslySetInnerHTML={{ __html: episode.description}} 
            />
        </div>
    )
}


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{
            // deve passar os params para cada novo path
            params: {
                slug: 'a-importancia-da-contribuicao-em-open-source'
            }
        }],
        fallback: 'blocking'
            // blocking: vai usar a requisição no lado do servidor next, caso uma página acessada
            // não foi gerada de forma estática (incremental static regeneration)

            // true: ao acessar o episódio eque não foi gerado estático irá buscar 
            // o getStaticProps para o lado do client (incremental static regeneration)

            // false: retorna página 404 caso a página não foi gerada de forma estática
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params;
    const { data } = await api.get(`/episodes/${slug}`);


    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', {
            locale: ptBR
        }),
        duration: Number(data.file.duration),
        durationAsString: converDurationToTimeString(Number(data.file.duration)),
        description: data.description,
        url: data.file.url,
    }

    return {
        props: {
            episode
        },
        revalidate: 60 * 60 * 24 // 24 hours
    }
}