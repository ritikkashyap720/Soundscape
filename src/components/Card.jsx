import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { NowPlayingContext } from '../context/NowPlayingContext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Card({ data }) {
    const { setSongValue, song } = useContext(NowPlayingContext);
    function createTimeStamp(ms) {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        if (hours) {
            return [
                hours.toString().padStart(2, '0'),
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0'),
            ].join(':');
        } else if (minutes) {
            return [
                minutes.toString().padStart(2, '0'),
                seconds.toString().padStart(2, '0'),
            ].join(':');
        } else {
            return [
                seconds.toString().padStart(2, '0'),
            ].join(':');
        }
    }

    if (data.type == "song") {
        return (
            <Link to="/play" onClick={() => setSongValue(data)} className="card card-compact bg-base-100 w-96 shadow-xl hover:bg-red-200 overflow-hidden transition hover:text-black ">
                <figure className='' >
                    <img className='w-full blur-2xl '
                        src={data.thumbnails[1].url}
                        alt={data.name}
                    />
                    <img className='absolute top-50%'
                        src={data.thumbnails[1].url}
                        alt={data.name}
                    />
                </figure>
                <div className="card-body ">
                    <h2 className="card-title">{data.name} </h2>
                    <p>{createTimeStamp(data.duration)} | {data.artist.name ? data.artist.name : data.album.name}</p>
                </div>
                {
                   song && song.videoId == data.videoId ?
                        <div className='bg-inherit absolute right-5 bottom-5 rounded-full border-4 '>
                            <PlayArrowIcon sx={{ fontSize: 30 }} />
                        </div> : ""
                }
            </Link>
        )
    }
}

export default Card
