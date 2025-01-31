import React,{useContext} from 'react'
import MusicPlaceholder from "../assets/images/Musicplaceholder.png"
import { NowPlayingContext } from '../context/NowPlayingContext';

function MusicTiles({ songData }) {
   const { setSongValue, song } = useContext(NowPlayingContext);
  return (
    <div onClick={() => setSongValue(songData)} className='flex h-18 flex-row items-center gap-3 justify-between text-white cursor-pointer'>
      <div className='flex gap-3'>
        <img className='h-16 rounded-lg' src={songData.thumbnailUrl ? songData.thumbnailUrl : MusicPlaceholder} alt={songData.artists[0].name} />
        <div className='flex flex-col'>
          <p className='line-clamp-1 max-w-[50ch]'>{songData.title}</p>
          <p className='line-clamp-1'>{songData.artists.map((artist, index) => <span key={index}>{artist.name}{index < songData.artists.length - 1 && " | "}</span>)}</p>
        </div>
      </div>
      <span className='item-end'>{songData.duration.label}</span>
    </div>
  )
}

export default MusicTiles
