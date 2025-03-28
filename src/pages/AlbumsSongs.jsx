import { useContext, useEffect, } from 'react'
import '../App.css'
import axios from "axios";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import React from 'react';
import { NowPlayingContext } from '../context/NowPlayingContext';
import MusicTiles from '../components/MusicTiles';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

function AlbumsSongs() {
    const BASE_URL = "http://localhost:8000"
    const navigate = useNavigate()
    const { song, songsList, setSongsListValue, search } = useContext(NowPlayingContext)
    useEffect(()=>{
       if(!search){
        navigate("/")
       }
    },[])
    return (
        <div className='overflow-hidden'>
            <Navbar />
            <div className='w-full flex flex-row relative'>
                <Sidebar />

                <div className={`${song ? "h-[calc(100svh-168px)]" : "h-[calc(100svh-90px)]"} flex flex-col mt-[90px] w-full`}>
                    <p className='py-2 px-4 text-green-300 font-semibold'><button onClick={()=>{navigate(-1)}}><ArrowBackIosNewRoundedIcon sx={{ fontSize: 20 }}/></button> Album Songs</p>
                    <div className=' flex flex-col gap-4 p-4 overflow-y-auto'>
                        {songsList && songsList.map((video, index) => <MusicTiles key={index} songData={video} />)}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AlbumsSongs
