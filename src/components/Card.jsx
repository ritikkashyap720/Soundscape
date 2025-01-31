import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { NowPlayingContext } from '../context/NowPlayingContext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MusicPlaceholder from "../assets/images/MusicPlaceholder"

function Card({ data }) {
    const { setSongValue, song } = useContext(NowPlayingContext);

    return (
        <div onClick={() => setSongValue(data)} className="card card-compact bg-base-100 w-96 shadow-xl hover:bg-red-200 overflow-hidden transition hover:text-black ">
            <figure className='' >
                <img className='w-full'
                    src={data.thumbnailUrl ? data.thumbnailUrl : MusicPlaceholder}
                    alt={data.artists[0].name}  
                />
            </figure>
            <div className="card-body ">
                <h2 className="card-title">{data.title} </h2>
                <p>{data.duration.label} | {data.artists.map((artist, index) => <span key={index}>{artist.name}{index < data.artists.length - 1 && " | "}</span>)}</p>
            </div>
            {
                song && song.youtubeId == data.youtubeId ?
                    <div className='bg-inherit absolute right-5 bottom-5 rounded-full border-4 '>
                        <PlayArrowIcon sx={{ fontSize: 30 }} />
                    </div> : ""
            }
        </div>
    )

}

export default Card
