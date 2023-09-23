import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Library from '../Library/Library'
import Trending from '../Trending/Trending'
import Player from '../Player/Player'
import Favourites from '../Favourites/Favourites'
import Feed from '../Feed/Feed'
import "./styles.scss";
import Sidebar from '../../component/sidebar/Sidebar'
import ContentWrapper from '../../component/sidebar/ContentWrapper/ContentWrapper'
import { useEffect, useState } from 'react'
import Login from '../../auth/Login'
import { setClientToken } from '../../spotify'

export default function Home() {
  const [token,setToken]=useState("");
  
  useEffect(()=>{
    const token=window.localStorage.getItem("token");
    const hash=window.location.hash;
    window.location.hash="";
    if(!token && hash)
    {
    const _token=hash.split("&")[0].split("=")[1];
    window.localStorage.setItem("token",_token)
    setToken(_token);
    setClientToken(_token)
    }
    else{
    setToken(token);
    setClientToken(token)
    }
  },[]);



  return (!token? <Login/>:
  <BrowserRouter>
  <ContentWrapper>
  <div className='main-body'>
  <Sidebar/>
  <Routes>
 <Route path="/" element={<Library/>}>
 </Route>
 <Route path="/trending" element={<Trending/>}>
 </Route>
 <Route path="/player" element={<Player/>}>
  </Route>
  <Route path="/favourites" element={<Favourites/>}>
 </Route>
  <Route path="/feed" element={<Feed/>}>
  </Route>
  </Routes>
  </div>
  </ContentWrapper>

</BrowserRouter>)
  
}
