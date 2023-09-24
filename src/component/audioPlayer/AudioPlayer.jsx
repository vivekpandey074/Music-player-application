import { useEffect, useRef, useState } from "react";
import Controls from "./Controls";
import "./styles.scss";
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

import cd_disc_art from "../../assets/cd-disc.png";
import player_img from "../../assets/soundplayer.png";

export default function AudioPlayer({currentTrack, currentIndex, setCurrentIndex, total}) {

const artists=[];
currentTrack?.album?.artists.forEach((artist)=>{
    artists.push(artist.name)
})

const [isPlaying,setIsPlaying]=useState(false);
const [trackProgress,setTrackProgress]=useState(0);
var audioSrc=total[currentIndex]?.track.preview_url;
const audioRef=useRef(new Audio(total[currentIndex]?.track.preview_url))
const intervalRef=useRef();
const isReady=useRef(false);
const {duration}=audioRef.current;


const currentPercentage=duration? (trackProgress/duration)*100:0;







const startTimer=()=>{
clearInterval(intervalRef.current)

intervalRef.current=setInterval(()=>{
  if(audioRef.current.ended){
    handleNext();
  }
  else{
    setTrackProgress(audioRef.current.currentTime);
  }
 },[1000])

}



//this use Effect will run on pause/play
useEffect(()=>{



 if(audioRef.current.src){
if(isPlaying){
audioRef.current.play();
startTimer();
}else{
clearInterval(intervalRef.current);
audioRef.current.pause();

}

 }
//  else{
// if(isPlaying){
//   audioRef.current=new Audio(audioSrc);
//   audioRef.current.play();
//   startTimer();
// }else{
//   clearInterval(intervalRef.current);
//   audioRef.current.pause();
// }

//  }
   
},[isPlaying])




//this will run on song change
useEffect(()=>{
 audioRef.current.pause();
 audioRef.current=new Audio(audioSrc);


 //below condition is added to check if preview url of song is available or not
 //if it is not available we have to set playing false because that is set settrue by isReady
 if(total[currentIndex]?.track){
  if(total[currentIndex].track.preview_url===null){
    
    alert(`${total[currentIndex].track.name} is not availabel :(`)
    return
  }
}


 setTrackProgress(audioRef.current.currentTime);


 //isReady ref checks if our music if mounted for very first time.
 //if it is so then it will not automatically on play button..
 //and we will set isReady true so that next time we  know that we have to start/play  music automactically on index change

 if(isReady.current){
  audioRef.current.play();
  setIsPlaying(true);
  startTimer();

 }
 else{
  isReady.current=true;
 }

 
},[currentIndex])




useEffect(()=>{
  return ()=>{
    audioRef.current.pause();
    clearInterval(intervalRef.current);
  }
},[])

const handleNext = () => {
  if (currentIndex < total.length - 1) {
    setCurrentIndex(currentIndex + 1);
  } else setCurrentIndex(0);
};

const handlePrev = () => {
  if (currentIndex - 1 < 0) setCurrentIndex(total.length - 1);
  else setCurrentIndex(currentIndex - 1);
};


const addZero = (n) => {
  return n > 9 ? "" + n : "0" + n;
};
  return (
    <div className="player-body flex">
      <div className="player-left-body">
       <div className="Progress-bar-box">
       <CircularProgressbarWithChildren
        value={currentPercentage}
        strokeWidth={2}
        styles={buildStyles({
            pathColor: `rgba(207, 181, 60, ${75 / 100})`,
            backgroundColor:"C6A540"
          })}
       >
      <img src={cd_disc_art} alt="cd-art" className="cd-art"/>
       </CircularProgressbarWithChildren>
       </div>
       </div>
      <div className="player-right-body flex">
      <p className="song-title">{currentTrack?.name}</p>
      <p className="song-artist">{artists.join("|")}</p>

      <div className="player-right-bottom flex">
        <div className="song-duration flex">
        <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
        <img src={player_img} alt="sound player" className="sound-player-art" />
        <p className="duration">0:30</p>  
        </div>
        <Controls
         isPlaying={isPlaying}
         setIsPlaying={setIsPlaying}
         handleNext={handleNext}
         handlePrev={handlePrev}
         total={total}
        
        />
      </div>




      </div>
    </div>
  )
}
