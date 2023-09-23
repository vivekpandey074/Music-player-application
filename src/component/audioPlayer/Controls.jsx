import "./Controls.scss";
import {BiColor, BiSkipNext, BiSkipPrevious} from "react-icons/bi";
import {BsFillPauseFill,BsFillPlayFill} from "react-icons/bs";
import {IconContext} from "react-icons";


export default function Controls({isPlaying,setIsPlaying,handleNext,handlePrev}) {
  return (
   <IconContext.Provider value={{size:"35px",color:"#C4D0E3"}}>
   <div className="controls-Wrapper flex">
  <div className="action-btn" onClick={handlePrev}>
  <BiSkipPrevious/> 
  </div>
  <div className="play-pause-btn flex" onClick={()=> setIsPlaying((isPlaying)=> !isPlaying)}>
  {isPlaying ? <BsFillPauseFill/>: <BsFillPlayFill/>}
  </div>

  <div className="action-btn" onClick={handleNext}>
  <BiSkipNext/> 
  </div>
 

   </div>
   </IconContext.Provider>
  )
}
