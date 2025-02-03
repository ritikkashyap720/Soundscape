import React, { useContext, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { NowPlayingContext } from '../context/NowPlayingContext';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


function Navbar() {
    const BASE_URL = "http://localhost:8000"
    const { setSongsListValue, search, setSearch } = useContext(NowPlayingContext)
    const navigate = useNavigate();

    function handleSearch(e) {
        e.preventDefault()
        const data = new FormData(e.target);
        if (data.get("search") != "") {
            setSearch(data.get("search"))
            navigate("/songs")
            // if (window.location.pathname == "/") {
            // }
        }
    }


    return (
        <div className="navbar bg-[#001919] p-5 pr-3  fixed top-0 z-10 shadow-lg">
            <div className="flex-1">
                <Link className="text-xl font-semibold text-white flex items-center gap-2" to={"/"}><img className='w-12' src='/images/music-192x192.png' alt="music"/><p className='hidden lg:block'>Music</p></Link>
            </div>
            <form className="flex gap-2" onSubmit={(e) => { handleSearch(e) }}>
                <div className="form-control ">
                    <input type="text" placeholder={`${search ? "searching for - " + search : "Search"}`} name='search' className="input input-bordered md:w-auto w-full " />
                </div>
                <button type='submit' className="p-3 text-black bg-green-300 rounded-lg"><SearchIcon /></button>
            </form>
        </div>
    )
}

export default Navbar
