import { useEffect, useState } from "react";
import apiClient from "../../spotify";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";




export default function Trending() {
 const [featuredPlaylists,setFeaturedPlaylist]=useState([]);
 const navigate=useNavigate();
 useEffect(()=>{
 
  apiClient.get(`/browse/featured-playlists
  `)
  .then(res=>{
      const a=res.data?.playlists?.items;
      setFeaturedPlaylist(a);
      console.log(a)
  }).catch(err=>console.error(err));
 },[]);



 const playPlaylist=(id)=>{
  navigate('/player',{state:{id}})
  }


 return (
  <div className="screen-container">
  
  <div className="library-body">
  {featuredPlaylists?.map((playlist)=>(
  <div key={playlist.id} className="playlist-card" onClick={()=> playPlaylist(playlist.id)}>
    <img src={playlist?.images[0].url} alt="plalist-image" className="playlist-image" />
    <p className="playlist-title">{playlist?.name.length>30?playlist?.name.slice(0,30).trim()+"...":playlist?.name}</p>
    <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
    <AiFillPlayCircle className="play-btn" size={50}/>
    </div>
  ))}
  </div>
  </div>
)
}
