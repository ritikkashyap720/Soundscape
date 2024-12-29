import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import axios from "axios";


function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("")
  function handleSearch() {
    axios.get(`https://music-backend-k1wm.onrender.com/${search}`).then((response) => {
      setData(response.data);
      console.log(response.data)
    })
  }



  return (
    <div className='p-5'>
      <div className='w-full flex my-5 gap-5'>
                
                <input className='bg-inherit border-blue-400 flex-grow w-auto p-3 rounded-xl border-2 outline-none' placeholder='search' type="search" onChange={(e) => setSearch(e.target.value)} />
                <button className='bg-blue-400 rounded-xl shadow-2xl w-auto px-3 text-black bold' onClick={handleSearch}>Submit</button>
            </div>
      <div className='flex flex-wrap gap-6 p-4 w-full justify-center'>
        {data && data.map((video, index) => <Card key={index} data={video} />)}
      </div>
    </div>
  )
}

export default App
