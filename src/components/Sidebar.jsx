import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NowPlayingContext } from '../context/NowPlayingContext'
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import InsertEmoticonRoundedIcon from '@mui/icons-material/InsertEmoticonRounded';


function Sidebar() {
  const { setSongsListValue, search, setSearch } = useContext(NowPlayingContext)
  const [songs, setSongs] = useState(false)
  const [albums, setAlbumsSongs] = useState(false)
  const [yourSongs, setYourSongs] = useState(false)
  const [smallsidebar, setSmallsidebar] = useState(false);


  useEffect(() => {
    handleResize();
    if (window.location.pathname == "/") {
      setYourSongs(true)
    } else if (window.location.pathname == "/songs") {
      setSongs(true)
    } else {
      setAlbumsSongs(true)
    }
    
    // handle resize
    function handleResize() {
      if (window.innerWidth < 600) {
        setSmallsidebar(true);
      }else{
        setSmallsidebar(false)
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className={`h-[calc(100svh-88px)] ${smallsidebar?"w-[80px]":"w-52"} z-20 mt-[88px] bg-gray-900 flex flex-col items-center transition-all`}>
      {smallsidebar ? <>{search && <>
        <Link className={`${songs && "bg-gray-950"} font-bold hover:bg-gray-950 w-full text-center p-4 transition-all`} to={"/songs"}><AudiotrackRoundedIcon/></Link>
        <Link className={`${albums && "bg-gray-950"} font-bold hover:bg-gray-950 w-full text-center p-4 transition-all`} to={"/albums"}><LibraryMusicRoundedIcon/></Link>
      </>}
        <Link className={`${yourSongs && "bg-gray-950"} font-bold hover:bg-gray-950 w-full text-center p-4 transition-all`} to={"/"}><InsertEmoticonRoundedIcon/></Link></> : <>
        {search && <>
          <Link className={`${songs && "bg-gray-950"} font-bold hover:bg-gray-950 w-full text-center p-4 transition-all`} to={"/songs"}>Songs</Link>
          <Link className={`${albums && "bg-gray-950"} font-bold hover:bg-gray-950 w-full text-center p-4 transition-all`} to={"/albums"}>Albums</Link>
        </>}
        <Link className={`${yourSongs && "bg-gray-950"} font-bold hover:bg-gray-950 w-full text-center p-4 transition-all`} to={"/"}>Your Songs</Link></>}

    </div>
  )
}

export default Sidebar
