import { createContext, useState,useEffect } from 'react';

export const NowPlayingContext = createContext("");

export const NowPlayingContextProvider = ({ children }) => {
    // set song data
    const [song, setSong] = useState(null);
    function setSongValue(value) {
        if (value != song) {
            setSong(value)
        }
    }
    // set songs list
    const [songsList, setSongsList] = useState(null);
    function setSongsListValue(value) {
        setSongsList(value)
    }
    // set song recommendations
    const [songsRecommendations, setSongsRecommendations] = useState(null);
    // set search
    const [search, setSearch] = useState("")
    // get data and save data to localstorage
    const [localSongs, setLocalSongs] = useState([]);

    // Load songs from localStorage when component mounts
    useEffect(() => {
        const savedSongs = JSON.parse(localStorage.getItem("songs")) || [];
        setLocalSongs(savedSongs);
    }, []);

    // Function to add a song
    const addSong = (newSong) => {
        const updatedSongs = [...localSongs, newSong];
        setLocalSongs(updatedSongs);
        localStorage.setItem("songs", JSON.stringify(updatedSongs));
    };

    // Function to remove a song
    const removeSong = (youtubeId) => {
        const updatedSongs = localSongs.filter((song, i) => song.youtubeId !== youtubeId);
        setLocalSongs(updatedSongs);
        localStorage.setItem("songs", JSON.stringify(updatedSongs));
    };
    // Funtion to check a song is in local storage or not
    const findSongByYoutubeId = (youtubeId) => {
        return localSongs.some(song => song.youtubeId === youtubeId);
      };

    // play local song
    const [playLocalSongs, setPlayLocalSong] = useState(false);  

    return (
        <NowPlayingContext.Provider value={{ song, setSongValue, songsList, setSongsListValue, songsRecommendations, setSongsRecommendations, search, setSearch,localSongs,addSong,removeSong,findSongByYoutubeId,playLocalSongs,setPlayLocalSong }}>
            {children}
        </NowPlayingContext.Provider>
    )
}