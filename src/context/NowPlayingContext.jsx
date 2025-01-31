import { createContext, useState } from 'react';

export const NowPlayingContext = createContext("");

export const NowPlayingContextProvider = ({ children }) => {
    // set song data
    const [song, setSong] = useState(null);
    function setSongValue(value) {
        if(value!=song){
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

    return (
        <NowPlayingContext.Provider value={{ song, setSongValue, songsList, setSongsListValue, songsRecommendations, setSongsRecommendations,search,setSearch }}>
            {children}
        </NowPlayingContext.Provider>
    )
}