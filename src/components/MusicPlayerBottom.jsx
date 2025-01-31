import React, { useContext, useEffect, useState, useRef } from 'react'
import { NowPlayingContext } from '../context/NowPlayingContext'
import axios from 'axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import LoopIcon from '@mui/icons-material/Loop';
import MusicPlaceholder from "../assets/images/MusicPlaceholder.png"
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MusicTiles from './MusicTiles';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function MusicPlayerBottom() {
    const { song, setSong, setSongsRecommendations, songsRecommendations } = useContext(NowPlayingContext)
    const [audioSource, setAudioSource] = useState(null);
    const [isExpanded, setIsExpended] = useState(false);
    const [isMusicListExpanded, setisMusicListExpanded] = useState(false);
    const navigate = useNavigate();
    const BASE_URL = "http://localhost:8000"
    // chat gpt
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0); // Progress percentage
    const [duration, setDuration] = useState(0); // Total duration of the audio in seconds
    const [currentTime, setCurrentTime] = useState(0); // Current time of the audio in seconds
    const [volume, setVolume] = useState(100); // Volume percentage
    const audioRef = useRef(null);

    useEffect(() => {
        setDuration(0)
        audioRef.current = null;
        setAudioSource(null)
        setisMusicListExpanded(false)
        if (song) {
            axios.get(`${BASE_URL}/play/${song.youtubeId}`).then((response) => {
                if (response.data.audio) {
                    setAudioSource(response.data.audio[1].url)
                    setIsPlaying(true)
                }
            })
            axios.get(`${BASE_URL}/suggestions/${song.youtubeId} `).then((response) => { if (response.data) setSongsRecommendations(response.data) })
        }
    }, [song])




    useEffect(() => {
        if (audioRef.current) {
            const updateDuration = () => setDuration(audioRef.current.duration);
            audioRef.current.addEventListener("loadedmetadata", updateDuration);
            return () => audioRef.current.removeEventListener("loadedmetadata", updateDuration);
        }
    }, [song]);

    const togglePlayPause = () => {
        if(audioRef.current){
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSkipBack = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
        }
    };

    const handleSkipForward = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = Math.min(
                audioRef.current.currentTime + 10,
                audioRef.current.duration
            );
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume / 100;
        }
    };

    const handleProgressChange = (e) => {
        const newProgress = e.target.value;
        setProgress(newProgress);
        if (audioRef.current) {
            audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
        }
    };

    const updateProgress = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            setCurrentTime(current);
            setProgress((current / audioRef.current.duration) * 100);
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };
    if(song){
    return (
        <div className={`${isExpanded?"h-screen":"h-[80px]"} fixed bottom-0 z-30 transition-all w-full`}>
            {audioSource && <audio
                ref={audioRef}
                src={audioSource}
                onTimeUpdate={updateProgress}
                autoPlay
            />}
            {isExpanded ? <div className='w-full lg:h-screen h-[100%] fixed top-0 z-30 flex flex-row'>
                <button className=' btn-circle flex items-center justify-center p-1 fixed top-6 left-6 z-50 outline-none border-none bg-inherit text-white cursor-pointer hover:gray-300' onClick={() => { setIsExpended(false) }}><KeyboardArrowDownIcon sx={{ fontSize: 40 }} /></button>
                <div className='w-[100%] lg:w-[40%] md:w-[40%] bg-gray-900 flex justify-center items-center'>
                    <div className="h-full w-[100%] lg:w-[40%] md:w-[40%] fixed top-0 blur-[40px] z-10 overflow-hidden">

                        <img
                            src={song.thumbnailUrl ? song.thumbnailUrl : MusicPlaceholder}
                            alt="Album Cover"
                            className='h-[50%] w-[100%]'
                        />
                    </div>
                    <div className='flex flex-col justify-center h-full items-center min-w-[300px] overflow-y-auto w-[100%] p-5 z-40'>
                        <img
                            src={song.thumbnailUrl ? song.thumbnailUrl : MusicPlaceholder}
                            alt="Album Cover"
                            className="w-[80%] rounded-[20px] max-w-md"
                        />
                        <div className="text-center mt-8">
                            <p className="text-lg font-bold text-white">{song.title}</p>
                            <p className="text-sm text-white">{song.artists.map((artist, index) => <span key={index}>{artist.name}{index < song.artists.length - 1 && " | "}</span>)}</p>
                        </div>
                        <div className="my-2 flex w-[80%] items-center max-w-md">
                            <div className="text-xs text-white mx-4">
                                <p>{formatTime(currentTime)}</p>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={handleProgressChange}
                                className="range range-xs"
                            />
                            <div className="text-xs text-white mx-4">
                                {song.duration.label}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 w-[80%] justify-evenly mt-6 max-w-md">
                            <button className='btn-circle hover:text-gray-300 transition'><FavoriteBorderIcon x={{ fontSize: 30 }} /></button>
                            <button className='btn-circle hover:text-gray-300 transition' onClick={handleSkipBack}>
                                <SkipPreviousIcon sx={{ fontSize: 30 }} />
                            </button>
                            <button className='btn bg-white text-black btn-circle hover:bg-gray-300 transition' onClick={togglePlayPause}>
                                {isPlaying ? <PauseIcon sx={{ fontSize: 30 }} /> : <PlayArrowIcon sx={{ fontSize: 30 }} />}
                            </button>
                            <button className='btn-circle hover:text-gray-300 transition' onClick={handleSkipForward}>
                                <SkipNextIcon sx={{ fontSize: 30 }} />
                            </button>
                            <button className='btn-circle hover:text-gray-300 transition'>
                                <LoopIcon sx={{ fontSize: 30 }} />
                            </button>
                        </div>
                    </div>
                    <div className={`${isMusicListExpanded ? "h-full" : "h-14"} w-full fixed bottom-0 bg-gray-900  lg:hidden md:hidden z-50 transition-all`}>
                        <div className='overflow-y-scroll h-[calc(100%-54px)] p-4 flex flex-col gap-4 '>
                            {songsRecommendations && songsRecommendations.map((song, index) => <MusicTiles key={index} songData={song} />)}
                        </div>

                        <button onClick={() => { setisMusicListExpanded(!isMusicListExpanded) }} className='text-white w-full h-14 fixed bottom-0 bg-inherit '>{isMusicListExpanded ? <ExpandMoreIcon /> : <QueueMusicIcon />}</button>
                    </div>
                </div>
                <div className='bg-gray-900 h-full lg:w-[60%] md:w-[60%] hidden md:flex flex-col gap-4 p-4 overflow-y-auto'>
                    {songsRecommendations && songsRecommendations.map((song, index) => <MusicTiles key={index} songData={song} />)}
                </div>
            </div> : <div className='flex items-center p-4 bg-gray-900 shadow-md rounded-t-[14px] w-full z-30 text-white justify-between gap-2'>        
                <div className="flex items-center space-x-4">
                    <button onClick={() => { setIsExpended(true) }}>
                        <ExpandLessIcon />
                    </button>
                    <img
                        src={song.thumbnailUrl ? song.thumbnailUrl : MusicPlaceholder}
                        alt="Album Cover"
                        className="w-12 h-12 rounded-md"
                    />
                    <div className="text-left">
                        <p className="text-sm font-semibold line-clamp-1 lg:max-w-[20ch] ">{song.title}</p>
                        <p className="text-xs line-clamp-1">{song.artists.map((artist, index) => <span key={index}>{artist.name}{index < song.artists.length - 1 && " | "}</span>)}</p>
                    </div>
                </div>
                <div className="text-xs mx-4 hidden sm:hidden lg:block ">
                    {formatTime(currentTime)}
                </div>
                {/* Progress Bar */}
                <div className="flex-1 mx-1 hidden sm:hidden lg:flex">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={(e)=>{handleProgressChange(e)}}
                        className="range range-xs"
                    />
                </div>
                <div className="text-xs mx-4 hidden sm:hidden lg:block ">
                    {song.duration.label}
                </div>

                {/* Controls */}
                <div className="items-center space-x-4 hidden sm:hidden lg:flex">
                    <button variant="ghost" size="sm" onClick={handleSkipBack}>
                        <SkipPreviousIcon />
                    </button>
                    <button variant="ghost" size="sm" onClick={togglePlayPause}>
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </button>
                    <button variant="ghost" size="sm" onClick={handleSkipForward}>
                        <SkipNextIcon />
                    </button>
                    <button variant="ghost" size="sm">
                        <LoopIcon />
                    </button>
                </div>
                {/* Additional Options */}
                <div className="items-center space-x-2 hidden sm:hidden lg:flex">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className=" range range-xs w-20 h-1 bg-gray-300 rounded-full"
                    />
                    <button  >
                        <VolumeUpIcon />
                    </button>
                </div>
                <div className="flex items-center space-x-4">
                    <button variant="ghost" size="sm" className=' lg:hidden' onClick={togglePlayPause}>
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </button>
                    <button><FavoriteBorderIcon /></button>
                </div>
            </div>}
        </div>
    )
}

}

export default MusicPlayerBottom
