import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { NowPlayingContext } from '../context/NowPlayingContext'

function Sidebar() {
  const { setSongsListValue, search, setSearch } = useContext(NowPlayingContext)
  return (
    <div className='h-[calc(100svh-88px)] w-52 z-20 mt-[88px] bg-gray-900 flex flex-col items-center'>
      {search && <>
        <Link className='font-bold hover:bg-gray-950 w-full text-center p-4 transition-all' to={"/songs"}>Songs</Link>
        <Link className='font-bold hover:bg-gray-950 w-full text-center p-4 transition-all' to={"/albums"}>Albums</Link>
      </>}
      <Link className='font-bold hover:bg-gray-950 w-full text-center p-4 transition-all' to={"/"}>Your Songs</Link>
      
    </div>
  )
}

export default Sidebar
