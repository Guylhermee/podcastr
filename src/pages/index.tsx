//CONSUMO DE API - SSG (STATIC SITE GENERATION)
import { GetStaticProps } from 'next';
import { api } from '../services/api';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

type Episode = {
  id: string;
  title: string;
  members: string;
  durationAsString: string;
  thumbnail: string;
  description: string;
  url: string;
  duration: number;
}

type HomeProps = {
  episodes: Episode[]; //ou episodes: Array<Episodes>;
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1>Hello World</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    //utilizando o axios, pode-se abstrair parte da url, além de passar parâmetros com o "params"
    params: {
      //passagem de parâmetros para a API
      _limit: 12,
      sort: 'published_at',
      order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      thumbnail: episode.thumbnail,
      description: episode.description,
      url: episode.file.url,
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
    };
  })

  return {
    props: {
      episodes,
    },
    //permite gerar uma nova página estática somente a cada 8 horas
    revalidate: 60 * 60 * 8,
  }
}

/*
//CONSUMO DE API - SSR (SERVER SIDE RENDERING)

import type { NextPage } from 'next'
import { Header } from '../components/Header'
import { useEffect } from 'react'

export default function Home(props: { episodes: any }) {
  return (
    <>
      <h1>Hello World</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </>
  )
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3333/episodes")
  const data = await response.json()

  return {
    props: {
      episodes: data,
    }
  }
}
*/

/*
//CONSUMO DE API - SPA (SINGLE PAGE APPLICATION)

import type { NextPage } from 'next'
import { Header } from '../components/Header'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    fetch("http://localhost:3333/episodes")
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])

  return (
    <>
      <h1>Hello World</h1>
    </>
  )
}
*/


