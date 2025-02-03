import { useContext, useEffect, useState } from 'react'
import '../App.css'
import axios from "axios";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import React from 'react';
import { NowPlayingContext } from '../context/NowPlayingContext';
import { useNavigate } from 'react-router-dom';
import AlbumTiles from '../components/AlbumTiles';

function Albums() {
    const BASE_URL = "http://localhost:8000"
    const navigate = useNavigate();
    const { song, songsList, setSongsListValue, search } = useContext(NowPlayingContext)
    const [albums, setAlbums] = useState(null)
    useEffect(() => {
        if (search) {
            axios.get(`${BASE_URL}/albums/${search}`).then((response) => {
                setAlbums(response.data);
            })
        } else {
            navigate(-1)
        }
    }, [search])

    return (
        <div className='overflow-hidden'>
            <Navbar />
            <div className='w-full flex flex-row relative'>
                <Sidebar />
                <div className={`${song ? "h-[calc(100svh-168px)]" : "h-[calc(100svh-88px)]"} flex flex-col mt-[88px] w-full`}>
                    <p className='py-2 px-4 text-white font-semibold'>Albums</p>
                    <div className=' flex flex-wrap  gap-4 p-4 overflow-y-auto w-full content-start'>
                    {albums && albums.map((album, index) => <AlbumTiles key={index} album={album} />)}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Albums
