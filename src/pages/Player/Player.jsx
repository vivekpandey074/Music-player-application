import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import apiClient from "../../spotify";
import SongCard from "../../component/songCard/SongCard";
import Queue from "../../component/queue/Queue";
import "./styles.scss";
import AudioPlayer from "../../component/audioPlayer/AudioPlayer";
import Widgets from "../../component/widgets/widgets";


export default function Player() {
   
  const location=useLocation();
  const [tracks,setTracks]=useState([])
  const [currentTrack,setCurrentTrack]=useState({});
  const [currentIndex,setCurrentIndex]=useState(0);
  const [currentID,setCurrentID]=useState(null);




 useEffect(()=>{ 

  if(location.state){
   sessionStorage.setItem("CurrentlyPlaying",location.state?.id)
   setCurrentID(location.state?.id)
    apiClient.get(`playlists/${location.state?.id}/tracks`)
    .then((res)=>{
     setTracks(res.data.items);
     
     setCurrentTrack(res.data.items[0].track);
     
    })
  }else {
   const x=sessionStorage.getItem("CurrentlyPlaying");
   setCurrentID(x);
   if(x!==null){
    apiClient.get(`playlists/${x}/tracks`)
    .then((res)=>{
     setTracks(res.data.items);
     console.log(res.data.items)
     setCurrentTrack(res.data.items[0].track);
     
    })
   }


  }
 },[location.state])
 

useEffect(()=>{
  setCurrentTrack(tracks[currentIndex]?.track);

},[currentIndex, tracks]);

  
  return ( currentID ?
   <div className="screen-container flex flex2 scrollable">
   <div className="left-player-body">
   <AudioPlayer currentTrack={currentTrack} total={tracks} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
   <Widgets artistID={currentTrack?.album?.artists[0]?.id}/>
   </div>
   <div className="right-player-body">
   <SongCard album={currentTrack?.album}/>
   <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} currentIndex={currentIndex}/>
   </div>
 </div> : 
  <div>Please Choose Playlist from library to play :)</div>
  )
}
