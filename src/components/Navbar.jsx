import React, { useContext, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { NowPlayingContext } from '../context/NowPlayingContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const BASE_URL = "http://localhost:8000"
    const { setSongsListValue, search, setSearch } = useContext(NowPlayingContext)
    const navigate = useNavigate();

    function handleSearch(e) {
        e.preventDefault()
        const data = new FormData(e.target);
        if (data.get("search") != "") {
            setSearch(data.get("search"))
            if (window.location.pathname == "/") {
                navigate("/songs")
            }
        }
    }


    return (
        <div className="navbar bg-gray-900 p-5 fixed top-0 z-10 shadow-lg">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Music</a>
            </div>
            <form className="flex-none gap-3 " onSubmit={(e) => { handleSearch(e) }}>
                <div className="form-control ">
                    <input type="text" placeholder={`${search ? "searching for - " + search : "Search"}`} name='search' className="input input-bordered w-24 md:w-auto bg-gray-900 w-full" />
                </div>
                <button type='submit' className="btn btn-info"><SearchIcon /></button>
            </form>
        </div>
    )
}

export default Navbar
