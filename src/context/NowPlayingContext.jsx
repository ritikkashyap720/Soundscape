import { createContext, useState } from 'react';

export const NowPlayingContext = createContext("");

export const NowPlayingContextProvider = ({children}) =>{
    const [song,setSong] = useState(null);
    function setSongValue(value){
        setSong(value)
    }
    return (
        <NowPlayingContext.Provider value={{song,setSongValue}}>
            {children}
        </NowPlayingContext.Provider>
    )
}