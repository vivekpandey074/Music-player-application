
import { useEffect, useState } from "react";
import "../../shared/globalStyles.scss";
import apiClient from "../../spotify";
import "./styles.scss";
import {AiFillPlayCircle} from "react-icons/ai";
import { useNavigate } from "react-router-dom";




export default function Library() {
const [playlists,setPlaylists]=useState(null);
const navigate=useNavigate();

useEffect(()=>{
  apiClient.get('me/playlists').then(function(response){
  setPlaylists(response?.data?.items)
  if(response?.data?.items.length===0){
    alert("Add Some Playlist from your spofity account ")
  }   
  })
 
},[])
 
 const playPlaylist=(id)=>{
 navigate('/player',{state:{id}})
 }



  return (
    <div className="screen-container">
    
    <div className="library-body">
    {playlists?.map((playlist)=>(
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
