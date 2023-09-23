import WidgetEntry from "./WidgetEntry";
import "./widgetCard.scss";

export default function WidgetCard({title, similar, featured,newRelease}) {
  
  return (
    <div className="widgetcard-body">
     <p className="widget-title">{title}</p>
     {similar ? similar.map((artist,index) =>(
      <WidgetEntry 
      key={index}
      title={artist?.name} 
      subtitle={artist?.followers?.total + " Followers"} 
      image={artist?.images[2]?.url}/>
       
     )):featured? featured.map((playlist,index)=> (
      <WidgetEntry key={index}
      title={playlist?.name}
      subtitle={playlist?.tracks?.total+" Songs"}
      image={playlist?.images[0]?.url}
      />
     )):newRelease? newRelease.map((album,index) =>(
     <WidgetEntry key={index}
      title={album?.name}
      subtitle={album?.artists[0]?.name}
      image={album?.images[2]?.url}
     />
     )):null}
    </div>
  )
}
