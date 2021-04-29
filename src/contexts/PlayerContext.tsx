import {createContext} from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: Episode) => void
    togglePlay: () => void,
    setPlayingState: (episode: boolean) => void
}

// valor padrão dentro de createContext para definir qual o formato dos dados desse contexto
export const PlayerContext = createContext({} as PlayerContextData); 

