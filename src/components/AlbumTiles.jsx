import React from 'react'
import MusicPlaceholder from "../assets/images/Musicplaceholder"

function AlbumTiles({ album }) {
    console.log(album.type)
    if (album.type != "Single") {
        return (
            <div className='flex flex-col gap-3 items-center justify-center w-fit h-fit'>
                <img className='h-40 rounded-full' src={album.thumbnailUrl ? album.thumbnailUrl : MusicPlaceholder} alt={album.artist} />
                <div className='flex flex-col items-center'>
                    <p className='line-clamp-1 max-w-[20ch] text-white'>{album.title}</p>
                    <p className='line-clamp-1 max-w-[40ch]'>{album.artist}</p>
                </div>
            </div>
        )
    }
}

export default AlbumTiles
