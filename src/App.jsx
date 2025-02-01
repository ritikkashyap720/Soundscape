import React, { useContext } from 'react'
import Songs from './pages/Songs.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import { NowPlayingContext, NowPlayingContextProvider } from './context/NowPlayingContext.jsx'
import MusicPlayerBottom from './components/MusicPlayerBottom.jsx'
import Albums from './pages/Albums.jsx';
import Home from './pages/Home.jsx';
import AlbumsSongs from './pages/AlbumsSongs.jsx';

function App() {
    const { song, songsList, setSongsListValue } = useContext(NowPlayingContext)
    return (
        <NowPlayingContextProvider>
            <BrowserRouter>
                <MusicPlayerBottom />
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/albums" element={<Albums />} />
                    <Route path="/songs" element={<Songs />} />
                    <Route path="/albums/songs" element={<AlbumsSongs />} />
                </Routes>
            </BrowserRouter>
        </NowPlayingContextProvider>
    )
}

export default App
