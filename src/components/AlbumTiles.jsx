import React, { useContext } from 'react'
import { NowPlayingContext } from '../context/NowPlayingContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AlbumTiles({ album }) {
    const BASE_URL = "http://localhost:8000"
    const { setSongsListValue, search } = useContext(NowPlayingContext)
    const navigate = useNavigate();
    function searchMusicFromAlbum(albumId) {
        if (search) {
            axios.get(`${BASE_URL}/music_from_album/${albumId}`).then((response) => {
                setSongsListValue(response.data);
                navigate("/albums/songs")
            })
        }
    }
    if (album.type != "Single") {
        return (
            <div onClick={() => { searchMusicFromAlbum(album.albumId) }} className='flex flex-col gap-3 items-center justify-center w-fit h-fit cursor-pointer'>
                <img className='h-40 rounded-full' src={album.thumbnailUrl ? album.thumbnailUrl : ""} alt={album.artist} />
                <div className='flex flex-col items-center'>
                    <p className='line-clamp-1 max-w-[20ch] text-white'>{album.title}</p>
                    <p className='line-clamp-1 max-w-[40ch]'>{album.artist}</p>
                </div>
            </div>
        )
    }
}

export default AlbumTiles
