import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NowPlayingContext } from '../context/NowPlayingContext'
import AudiotrackRoundedIcon from '@mui/icons-material/AudiotrackRounded';
import LibraryMusicRoundedIcon from '@mui/icons-material/LibraryMusicRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';


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
    <div className={`h-[calc(100svh-90px)] ${smallsidebar?"w-[80px]":"w-52"} mt-[90px] bg-[#001919] flex flex-col items-end transition-all`}>
      {smallsidebar ? <>{search && <>
        <Link className={`${songs && "text-green-300"} font-bold hover:text-green-300 w-[90%] text-center p-4 rounded-s-lg transition-all`} to={"/songs"}><AudiotrackRoundedIcon/> <p className='text-[12px]'>Songs</p></Link>
        <Link className={`${albums && "text-green-300"} font-bold hover:text-green-300 w-[90%] text-center p-4 rounded-s-lg transition-all`} to={"/albums"}><LibraryMusicRoundedIcon/><p className='text-[12px]'>Albums</p></Link>
      </>}
        <Link className={`${yourSongs && "text-green-300"} font-bold hover:text-green-300 w-[90%] text-center p-4 rounded-s-lg transition-all`} to={"/"}><FavoriteIcon/> <p className='text-[12px]'>Liked</p></Link></> : <>
        {search && <>
          <Link className={`${songs && "text-green-300"} font-bold hover:text-green-300 w-[90%] text-center p-4  rounded-s-lg transition-all`} to={"/songs"}>Songs</Link>
          <Link className={`${albums && "text-green-300"} font-bold hover:text-green-300 w-[90%] text-center p-4 rounded-s-lg transition-all`} to={"/albums"}>Albums</Link>
        </>}
        <Link className={`${yourSongs && "text-green-300"} font-bold hover:text-green-300 w-[90%] text-center p-4 rounded-s-lg transition-all`} to={"/"}>Liked</Link></>}

    </div>
  )
}

export default Sidebar
