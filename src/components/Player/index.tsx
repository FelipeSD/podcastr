import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import styles from './styles.module.scss';
import { usePlayer } from '../../contexts/PlayerContext';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {
    const audioRef = useRef<HTMLAudioElement>(null);

    const [progress, setProgress] = useState(0);

    const {
        episodeList, 
        currentEpisodeIndex, 
        isPlaying, 
        togglePlay, 
        setPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        isLooping,
        toggleLoop,
        toggleShuffle,
        isShuffling,
        clearPlayerState
    } = usePlayer();

    const episode = episodeList[currentEpisodeIndex];

    function setupProgressListener(){
        audioRef.current.currentTime = 0;

        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime));
        });
    }

    function handleSeek(amount: number){
        audioRef.current.currentTime = amount;
        setProgress(amount);
    }

    function handleEpisodeEnded(){
        if(hasNext){
            playNext();
        }else{
            clearPlayerState();
        }
    }

    useEffect(()=>{
        if(!audioRef.current){
            return;
        }

        if(isPlaying){
            audioRef.current.play();
        }else{
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando agora" />
                <strong>Tocando agora</strong>
            </header>
            {
                episode 
                    ? (
                        <div className={styles.currentEpisode}>
                            <Image width="592" height="592"
                                src={episode.thumbnail}
                                objectFit="cover" />
                            <strong>{episode.title}</strong>
                            <span>{episode.members}</span>
                        </div>
                    ) 
                    : (
                        <div className={styles.emptyPlayer}>
                            <strong>Selecione um podcast para ouvir</strong>
                        </div>
                    )
            }

            <footer className={!episode ? styles.empty : ""}>
                <div className={styles.progress}>

                    <span>{convertDurationToTimeString(progress)}</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                max={episode.duration}
                                value={progress}
                                trackStyle={{backgroundColor: '#04d641'}}
                                railStyle={{backgroundColor: '#9f75ff'}}
                                handleStyle={{backgroundColor: '#04d641', borderWidth: 4}}
                                onChange={handleSeek}
                            />
                        ):(
                            <div className={styles.emptySlider} />
                        )}
                    </div>
                    <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span>

                </div>

                {episode && (
                    <audio
                        ref={audioRef}
                        src={episode.url}
                        autoPlay
                        loop={isLooping}
                        onEnded={handleEpisodeEnded}
                        onPlay={()=>{
                            setPlayingState(true);
                        }}
                        onPause={()=>{
                            setPlayingState(false);
                        }}
                        onLoadedMetadata={setupProgressListener}
                    />
                )}

                <div className={styles.buttons}>
                    <button type="button" 
                        disabled={!episode || episodeList.length === 1}
                        className={isShuffling ? styles.isActive : ''}
                        onClick={() => toggleShuffle()}
                    >
                        <img src="/shuffle.svg" alt="Embaralhar"/>
                    </button>

                    <button type="button"
                        onClick={() => playPrevious()} 
                        disabled={!episode || !hasPrevious}
                    >
                        <img src="/play-previous.svg" alt="Tocar anterior"/>
                    </button>

                    <button type="button" disabled={!episode}
                        className={styles.playButton}
                        onClick={()=>togglePlay()}
                    >
                        {isPlaying
                            ? <img src="/pause.svg" alt="Pausar"/>
                            : <img src="/play.svg" alt="Tocar"/>
                        }
                    </button>

                    <button type="button" 
                        onClick={() => playNext()}
                        disabled={!episode}>
                        <img src="/play-next.svg" alt="Tocar próxima"/>
                    </button>

                    <button type="button" 
                        className={isLooping ? styles.isActive : ''}
                        onClick={() => toggleLoop()}
                        disabled={!episode || !hasNext}
                    >
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                </div>

            </footer>
        </div>
    );
}