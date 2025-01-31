import { useContext, useEffect, } from 'react'
import '../App.css'
import axios from "axios";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import React from 'react';
import { NowPlayingContext } from '../context/NowPlayingContext';
import MusicTiles from '../components/MusicTiles';
import { useNavigate } from 'react-router-dom';

function Songs() {
  const BASE_URL = "http://localhost:8000"
  const { song, songsList, setSongsListValue, search } = useContext(NowPlayingContext)
  const navigate = useNavigate();
  useEffect(() => {
    if (search) {
      axios.get(`${BASE_URL}/${search}`).then((response) => {
        setSongsListValue(response.data);
      })
    }else{
      navigate(-1)
    }
  }, [search])
  return (
    <div className='overflow-hidden'>
      <Navbar />
      <div className='w-full flex flex-row relative'>
        <Sidebar />
        <div className={`${song ? "h-[calc(100svh-168px)]" : "h-[calc(100svh-88px)]"} flex flex-col gap-4 p-4 overflow-y-auto mt-[88px] w-full`}>
          {songsList && songsList.map((video, index) => <MusicTiles key={index} songData={video} />)}
        </div>
      </div>

    </div>
  )
}

export default Songs

