import React, { useContext } from 'react'
import { NowPlayingContext } from '../context/NowPlayingContext';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function MusicTiles({ songData }) {
  const { setSongValue, song, addSong, localSongs, findSongByYoutubeId, removeSong } = useContext(NowPlayingContext);
  if (song) {
    if (song.youtubeId === songData.youtubeId) {
      console.log("playing")
    }
  }
  var isSaved = findSongByYoutubeId(songData.youtubeId);
  return (
    <div onClick={() => setSongValue(songData)} className='flex h-18 flex-row items-center gap-3 justify-between text-white cursor-pointer'>
      <div className='flex gap-3 relative'>
        {song && song.youtubeId===songData.youtubeId ?  <div className="playing h-16 rounded-lg aspect-square">
          <span className="playing__bar playing__bar1"></span>
          <span className="playing__bar playing__bar2"></span>
          <span className="playing__bar playing__bar3"></span>
          <span className="playing__bar playing__bar5"></span>
          <span className="playing__bar playing__bar6"></span>
        </div>:""}
        <img className='h-16 rounded-lg aspect-square object-cover' src={songData.thumbnailUrl ? songData.thumbnailUrl : ""} alt={"image"} onError={(e) => { e.target.onerror = null; e.target.src = "/Musicplaceholder.png"; }} />
        <div className='flex flex-col'>
          <p className='line-clamp-1 max-w-[50ch]'>{songData.title}</p>
          <p className='line-clamp-1'>{songData.artists.map((artist, index) => <span key={index}>{artist.name}{index < songData.artists.length - 1 && " | "}</span>)}</p>
        </div>
      </div>
      <div className='flex gap-2 items-center'>
        <span className='item-end'>{songData.duration.label}</span>
        {isSaved ? <button className='btn' onClick={(e) => { e.stopPropagation(); removeSong(songData.youtubeId) }}><FavoriteRoundedIcon className='text-green-300 ' /></button> : <button className='btn' onClick={(e) => { e.stopPropagation(); addSong(songData) }}><FavoriteBorderRoundedIcon /></button>}
        {/* <button><MoreVertIcon/></button> */}
      </div>
    </div>
  )
}

export default MusicTiles
