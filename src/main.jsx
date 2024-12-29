import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Player from './pages/Player.jsx'
import { NowPlayingContextProvider } from './context/NowPlayingContext.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/play",
    element: <Player />
  }
]);


createRoot(document.getElementById('root')).render(
  <NowPlayingContextProvider>
    <RouterProvider router={router} />
  </NowPlayingContextProvider>
)
