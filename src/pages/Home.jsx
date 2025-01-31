import { useContext, useEffect, useState } from 'react'
import '../App.css'
import axios from "axios";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import React from 'react';
import { NowPlayingContext } from '../context/NowPlayingContext';

function Home() {
  const BASE_URL = "http://localhost:8000"
  const { song, songsList, setSongsListValue } = useContext(NowPlayingContext)

  return (
    <div className='overflow-hidden'>
      <Navbar />
      <div className='w-full flex flex-row relative'>
        <Sidebar />
        <div className={`${song?"h-[calc(100svh-168px)]":"h-[calc(100svh-88px)]"} flex flex-col gap-4 p-4 overflow-y-auto mt-[88px] w-full`}>
          {/* {songsList && songsList.map((video, index) => <MusicTiles key={index} songData={video} />)} */}
          liked
        </div>
      </div>
     
    </div>
  )
}

export default Home
