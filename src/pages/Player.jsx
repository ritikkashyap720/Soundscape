import React, { useContext, useEffect, useState } from 'react'
import ReactAudioPlayer from 'react-audio-player';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Card from '../components/Card';
import { NowPlayingContext } from '../context/NowPlayingContext';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

function Player() {
    const { song, setSong } = useContext(NowPlayingContext)
    const [data, setData] = useState([]);
    const [audioSource, setAudioSource] = useState('');
    const navigate = useNavigate();
    console.log(song)
    const [search, setSearch] = useState("")

    function handleSearch() {
        axios.get(`https://music-backend-fg40.onrender.com/${search}`).then((response) => {
            setData(response.data);
            console.log(response.data)
        })
    }

    useEffect(() => {
        setAudioSource(null)
        setData(null)
        axios.get(`https://music-backend-fg40.onrender.com/${song.videoId}`).then((response) => {
            if (response.data.audio) {
                console.log(response)
                setAudioSource(response.data.audio[1].url)
            }
        })
        if (song.artist.name) {
            axios.get(`https://music-backend-fg40.onrender.com/${song.artist.name} `).then((response) => { if (response.data) { setData(response.data) } console.log(response) })
               
        } else {
            axios.get(`https://music-backend-fg40.onrender.com/${song.album.name} `).then((response) => { if (response.data) { setData(response.data) } console.log(response) })
        }
    }, [song]);



    return (
        <div className='p-5 w-full'>
            <div className='w-full flex my-5 gap-5'>
                <button className='bg-blue-400 rounded-full shadow-2xl w-auto px-3 text-black bold' onClick={() => navigate(-1)}><ArrowBackIosNewIcon/></button>
                <input className='bg-inherit border-blue-400 flex-grow w-auto p-3 rounded-xl border-2 outline-none' placeholder='search' type="search" onChange={(e) => setSearch(e.target.value)} />
                <button className='bg-blue-400 rounded-xl shadow-2xl w-auto px-3 text-black bold' onClick={handleSearch}>Submit</button>
            </div>
            {song && <div className="bg-slate-500 z-20 shadow-xl p-5 flex flex-row items-center flex-wrap gap-3 justify-between border-blue-400 border-2 rounded-lg overflow-hidden sticky top-5">
                <img className='w-full h-40 absolute top-0 left-0 blur-3xl z-0'
                    src={song.thumbnails[1].url}
                    alt={song.name} />
                <div className='flex gap-3 items-center'>
                <figure className='z-20'>
                    <img
                        className='rounded-xl'
                        src={song.thumbnails[1].url}
                        alt={song.name} />
                </figure>
                <div className="card-body z-20 text-white p-0.5">
                    <h2 className="card-title">{song.name}</h2>
                    <p>{song.artist.name} || {song.album.name}</p>

                </div>
                </div>
                <div className='w-full'>
                 {audioSource && <audio className='w-full' src={audioSource} controls />}
                </div>
            </div>

            }

            <div className='flex flex-wrap gap-6 p-4 w-full justify-center'>
                {data && data.map((video, index) => <Card key={index} data={video} />)}
            </div>
        </div>
    )
}

export default Player
