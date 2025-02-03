import { useContext, useEffect, useState } from 'react'
import '../App.css'
import axios from "axios";
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import React from 'react';
import { NowPlayingContext } from '../context/NowPlayingContext';
import MusicTiles from '../components/MusicTiles';

function Home() {
  const BASE_URL = "http://localhost:8000"
  const { song, songsList, setSongsListValue, localSongs,setPlayLocalSong,playLocalSongs } = useContext(NowPlayingContext)

  return (
    <div className='overflow-hidden'>
      <Navbar />
      <div className='w-full flex flex-row relative'>
        <Sidebar />
        <div className={`${song ? "h-[calc(100svh-168px)]" : "h-[calc(100svh-90px)]"} flex flex-col mt-[90px] w-full `}>
          <div className='py-2 px-4 flex justify-between items-center'>
          <p className=' text-green-300 font-semibold'>Liked Songs</p>
          <span className='flex items-center gap-2'>
          Play liked songs
          <input type="checkbox" className="toggle toggle-sm" onClick={()=>setPlayLocalSong(!playLocalSongs)} checked={playLocalSongs}/>
          </span>
          </div>
          <div className=' flex flex-col gap-4 p-4 overflow-y-auto'>
            {localSongs ? localSongs.map((data, index) => <MusicTiles key={index} songData={data} />) : "No liked songs"}
          </div>
        </div>
      </div>

    </div >
  )
}

export default Home
