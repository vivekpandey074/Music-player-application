import "./styles.scss";
export default function Queue({tracks , setCurrentIndex, currentIndex}) {
  return (
    <div className="queue-container flex">
    <div className="queue flex">
    <p className="upNext">Up Next</p>
    <div className="queue-list">
    {
    tracks?.map((track,index) =>(
     <div key={track?.id} 
     className={`queue-item flex ${index===currentIndex? "active":""}`} 
     onClick={()=> setCurrentIndex(index)}>
      
      <div className="trackname"><p className="moving">{track?.track?.name}</p></div>
      <div className="time-duration">0:30</div>
     </div>
    )) 
    

     
    
    }
    </div>

    </div>
    </div>
  )
}
