import React, { useContext, useEffect, useState, useRef } from 'react'
import { NowPlayingContext } from '../context/NowPlayingContext'
import axios from 'axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import LoopIcon from '@mui/icons-material/Loop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MusicTiles from './MusicTiles';
import { replace, useNavigate } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useLocation } from "react-router-dom";


function MusicPlayerBottom() {
    const { song, findSongByYoutubeId, setSongValue, setSongsRecommendations, songsRecommendations, addSong, removeSong, localSongs, playLocalSongs } = useContext(NowPlayingContext)
    const [audioSource, setAudioSource] = useState(null);
    const [isExpanded, setIsExpended] = useState(false);
    const [isMusicListExpanded, setisMusicListExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const BASE_URL = "http://localhost:8000"
    const [songThumnails, setSongThumnails] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0); // Progress percentage
    const [duration, setDuration] = useState(0); // Total duration of the audio in seconds
    const [currentTime, setCurrentTime] = useState(0); // Current time of the audio in seconds
    const [volume, setVolume] = useState(100); // Volume percentage
    const audioRef = useRef(null);
    const [loopAudio, setLoopAudio] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // local storage check
    const [isSaved, setIsSaved] = useState(false)
    useEffect(() => {
        if (song) {
            setIsSaved(findSongByYoutubeId(song.youtubeId))
        }
    }, [localSongs, song])
    // check location 
    useEffect(() => {
        if (location.hash == "#player") {
            setIsExpended(true);
            setisMusicListExpanded(false)
        } else if (location.hash == "#musicsuggestion") {
            setisMusicListExpanded(true)
        } else {
            setIsExpended(false)
        }
    }, [location])
    // load music suggestion
    useEffect(() => {
        setDuration(0)
        setProgress(0)
        setCurrentTime(0)
        audioRef.current = null;
        setIsLoading(true)
        setAudioSource(null)
        setisMusicListExpanded(false)
        if (song) {
            axios.get(`${BASE_URL}/play/${song.youtubeId}`).then((response) => {
                if (response.data.audio) {
                    setAudioSource(response.data.audio.url)
                }
                setIsLoading(false);
            })
            if (audioSource) {
                setIsPlaying(true)
            }
            if (playLocalSongs) {
                setSongsRecommendations(localSongs);
            } else {
                axios.get(`${BASE_URL}/suggestions/${song.youtubeId} `).then((response) => { if (response.data) setSongsRecommendations(response.data) })
            }
            axios.get(`${BASE_URL}/getSongDetails/${song.youtubeId} `).then((response) => { if (response.data) setSongThumnails(response.data.thumbnailUrl) })
        }
    }, [song])

    // media notification controls
    useEffect(() => {
        if ("mediaSession" in navigator) {
            if (song) {
                var artistName = "";
                song.artists.map((artist, index) => <span key={index}>{artist.name}{index < song.artists.length - 1 && " | "}</span>)
                for (let i = 0; i < song.artists.length; i++) {
                    if (i < song.artists.length - 1) {
                        artistName = artistName + song.artists[i].name + " | ";
                    } else {
                        artistName = artistName + song.artists[i].name;
                    }
                }

                navigator.mediaSession.metadata = new MediaMetadata({
                    title: song.title,
                    artist: artistName,
                    artwork: [
                        { src: song.thumbnailUrl, sizes: "512x512", type: "image/png" },
                    ],
                });

                navigator.mediaSession.setActionHandler("play", () => {
                    audioRef.current.play();
                    setIsPlaying(true);
                });

                navigator.mediaSession.setActionHandler("pause", () => {
                    audioRef.current.pause();
                    setIsPlaying(false);
                });

                navigator.mediaSession.setActionHandler("seekbackward", (details) => {
                    audioRef.current.currentTime -= details.seekOffset || 10;
                });

                navigator.mediaSession.setActionHandler("seekforward", (details) => {
                    audioRef.current.currentTime += details.seekOffset || 10;
                });

                navigator.mediaSession.setActionHandler("previoustrack", () => {
                    handleSkipBack()
                });

                navigator.mediaSession.setActionHandler("nexttrack", () => {
                    handleSkipForward()
                });
            }
        }
    }, [song]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
            audioRef.current.play();
            setIsLoading(false)
        }
    }, [audioRef.current])

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSkipBack = () => {
        // console.log("previous")
        // console.log(isLoading)
        // if (!isLoading) {
            if (playLocalSongs) {
                const currentIndex = songsRecommendations.findIndex(item => item.youtubeId == song.youtubeId)
                if (currentIndex == 0) {
                    setSongValue(songsRecommendations[songsRecommendations.length - 1])
                } else {
                    setSongValue(songsRecommendations[currentIndex - 1])
                }
            }
            else if (songsRecommendations) {
                setSongValue(songsRecommendations[0]);
            }
        // };
    }

    const handleSkipForward = () => {
        // console.log("next", isLoading)
        // if (!isLoading) {
            if (playLocalSongs) {
                const currentIndex = songsRecommendations.findIndex(item => item.youtubeId == song.youtubeId)
                if (currentIndex == songsRecommendations.length - 1) {
                    setSongValue(songsRecommendations[0])
                } else {
                    setSongValue(songsRecommendations[currentIndex + 1])
                }
            } else if (songsRecommendations) {
                setSongValue(songsRecommendations[1]);
            }
        // }
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
            if (isLoading) {
                setIsLoading(false);
            }
        }

        if (Math.floor(audioRef.current.currentTime) == song.duration.totalSeconds - 1) {
            if (!loopAudio) {
                handleSkipForward()
            }
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };
    if (song) {
        return (
            <div className={`${isExpanded ? "h-full top-0 fixed" : "h-[80px] bottom-0 fixed "}   z-30 transition-all w-full duration-[300ms]`}>
                {audioSource && <audio
                    ref={audioRef}
                    src={audioSource}
                    onTimeUpdate={updateProgress}
                    className=''
                    loop={loopAudio}
                    autoPlay
                />}
                {isExpanded ? <div className='w-full lg:h-screen h-[100%] fixed top-0 z-30 flex flex-row'>
                    <button className='flex items-center justify-center p-1 fixed top-6 left-6 z-50 outline-none border-none text-white cursor-pointer hover:gray-300' onClick={() => { setIsExpended(false); navigate(-1) }}><KeyboardArrowDownIcon sx={{ fontSize: 40 }} /></button>
                    <div className='w-[100%] lg:w-[40%] md:w-[40%] bg-[#001919] flex justify-center items-center'>
                        <div className="h-full w-[100%] lg:w-[40%] md:w-[40%] fixed top-0 blur-[40px] z-10 overflow-hidden">
                            <img
                                src={songThumnails ? songThumnails : ""}
                                alt="Album Cover"
                                className='h-[50%] w-[100%]'
                                onError={(e) => { e.target.onerror = null; e.target.src = "Musicplaceholder.png"; }}
                            />
                        </div>
                        <div className='flex flex-col justify-center h-full items-center min-w-[300px] overflow-y-auto w-[100%] p-5 z-40'>
                            <img
                                src={songThumnails ? songThumnails : ""}
                                alt="Album Cover"
                                className="w-[100%] aspect-square object-cover rounded-[20px] max-w-md"
                                onError={(e) => { e.target.onerror = null; e.target.src = "Musicplaceholder.png"; }}
                            />
                            <div className="text-center mt-8">
                                <p className="text-lg font-bold text-white">{song.title}</p>
                                <p className="text-sm text-white">{song.artists.map((artist, index) => <span key={index}>{artist.name}{index < song.artists.length - 1 && " | "}</span>)}</p>
                            </div>
                            <div className="my-2 flex w-[100%] items-center max-w-md">
                                <div className="text-xs text-white mx-4">
                                    {isLoading ? "0:00" : <p>{formatTime(currentTime)}</p>}
                                </div>
                                {isLoading ? <div className="skeleton bg-[#26683e] h-[5px] w-full"></div> : <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progress}
                                    onChange={handleProgressChange}
                                    className="range range-xs"
                                />}

                                <div className="text-xs text-white mx-4">
                                    {isLoading ? "0:00" : song.duration.label}
                                </div>
                            </div>
                            <div className="flex items-center space-x-4 w-[100%] justify-evenly mt-6 mb-[60px] max-w-md">
                                {isSaved ? <button className='btn hover:text-gray-300 transition' onClick={() => { removeSong(song.youtubeId); setIsSaved(false) }}><FavoriteRoundedIcon sx={{ fontSize: 30 }} className='text-green-300' /></button> : <button onClick={() => { addSong(song); setIsSaved(true) }} className='btn hover:text-gray-300 transition'><FavoriteBorderIcon sx={{ fontSize: 30 }} /></button>}
                                <button className='btn-circle hover:text-gray-300 transition' onClick={handleSkipBack}>
                                    <SkipPreviousIcon sx={{ fontSize: 30 }} />
                                </button>
                                <button className='bg-white text-black btn-circle hover:bg-gray-300 transition' onClick={togglePlayPause}>
                                    {isPlaying ? <PauseIcon sx={{ fontSize: 30 }} /> : <PlayArrowIcon sx={{ fontSize: 30 }} />}
                                </button>
                                <button className='btn-circle hover:text-gray-300 transition' onClick={handleSkipForward}>
                                    <SkipNextIcon sx={{ fontSize: 30 }} />
                                </button>
                                <button className={`btn transition ${loopAudio && "text-green-300"}`} onClick={() => { setLoopAudio(!loopAudio) }}>
                                    <LoopIcon sx={{ fontSize: 30 }} />
                                </button>
                            </div>
                        </div>
                        <div className={`${isMusicListExpanded ? "h-full" : "h-14"} w-full fixed bottom-0 bg-[#001919]  lg:hidden md:hidden z-50 transition-all`}>
                            <div className='overflow-y-scroll h-[calc(100%-54px)] p-4 flex flex-col gap-4 '>
                                {songsRecommendations && songsRecommendations.map((song, index) => <MusicTiles key={index} songData={song} />)}
                            </div>
                            <button onClick={() => { setisMusicListExpanded(!isMusicListExpanded); isMusicListExpanded ? navigate(-1) : navigate("#musicsuggestion") }} className='text-white w-full h-14 fixed bottom-0 bg-inherit '>{isMusicListExpanded ? <ExpandMoreIcon /> : <QueueMusicIcon />}</button>
                        </div>
                    </div>
                    <div className='bg-[#001919] h-full lg:w-[60%] md:w-[60%] hidden md:flex flex-col gap-4 p-4 overflow-y-auto'>
                        {songsRecommendations && songsRecommendations.map((song, index) => <MusicTiles key={index} songData={song} />)}
                    </div>
                </div> : <div onClick={() => { setIsExpended(true); navigate("#player") }} className='flex items-center p-4 bg-[#001919] shadow-md border-t-[1px] border-green-300 w-full z-30 text-white justify-between gap-2'>
                    <div className="flex items-center space-x-4">
                        <button className='btn'>
                            <ExpandLessIcon />
                        </button>
                        <img
                            src={songThumnails ? songThumnails : ""}
                            alt="Album Cover"
                            className="h-12 object-cover aspect-square rounded-md"
                            onError={(e) => { e.target.onerror = null; e.target.src = "Musicplaceholder.png"; }}
                        />
                        <div className="text-left">
                            <p className="text-sm font-semibold line-clamp-1 lg:max-w-[20ch] ">{song.title}</p>
                            <p className="text-xs line-clamp-1">{song.artists.map((artist, index) => <span key={index}>{artist.name}{index < song.artists.length - 1 && " | "}</span>)}</p>
                        </div>
                    </div>
                    <div className="text-xs mx-4 hidden sm:hidden lg:block ">
                        {isLoading ? "00:00" : formatTime(currentTime)}
                    </div>
                    {/* Progress Bar */}
                    <div className="flex-1 mx-1 hidden sm:hidden lg:flex">
                        {isLoading ? <div className="skeleton w-full bg-[#26683e] h-[5px]"></div> : <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => { e.stopPropagation(); handleProgressChange(e) }}
                            className="range range-xs"
                        />}
                    </div>
                    <div className="text-xs mx-4 hidden sm:hidden lg:block ">
                        {isLoading ? "00:00" : song.duration.label}
                    </div>

                    {/* Controls */}
                    <div className="items-center space-x-4 hidden sm:hidden lg:flex">
                        <button className='btn' size="sm" onClick={(e) => { e.stopPropagation(); handleSkipBack() }}>
                            <SkipPreviousIcon />
                        </button>
                        <button className='btn' size="sm" onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}>
                            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </button>
                        <button className='btn' size="sm" onClick={(e) => { e.stopPropagation(); handleSkipForward() }}>
                            <SkipNextIcon />
                        </button>
                        <button variant="ghost" size="sm" className={`btn ${loopAudio && "text-green-300"}`} onClick={(e) => { setLoopAudio(!loopAudio); e.stopPropagation() }}>
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
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => { handleVolumeChange(e) }}
                            className=" range range-xs w-20 h-1 bg-gray-300 rounded-full"
                        />
                        <button  >
                            <VolumeUpIcon />
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        {isLoading ? <span className="loading loading-ring loading-md"></span> : <button variant="ghost" size="sm" className='btn bg-transparent border-0 lg:hidden' onClick={(e) => { e.stopPropagation(); togglePlayPause() }}>
                            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </button>}

                        {isSaved ? <button className='btn bg-transparent hover:text-gray-300 transition' onClick={(e) => { e.stopPropagation(); removeSong(song.youtubeId); setIsSaved(false) }}><FavoriteRoundedIcon sx={{ fontSize: 30 }} className='text-green-300' /></button> : <button onClick={(e) => { e.stopPropagation(); addSong(song); setIsSaved(true) }} className='hover:text-gray-300 transition'><FavoriteBorderIcon sx={{ fontSize: 30 }} /></button>}
                    </div>
                </div>}
            </div>
        )
    }

}

export default MusicPlayerBottom
