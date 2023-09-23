import "./AlbumInfo.scss";



export default function AlbumInfo({album}) {
 
  const artist=[];
  album?.artists?.forEach((element)=>{
    artist.push(element.name);
  })
 
 
 return (
 
 <div className="albumInfo">
  
  <div className="albumName-container">
      <div className="marquee">
      <p>{album?.name+"-"+artist?.join("-")}</p>
      </div>
    </div>
    <div className="album-info">
      <p>{album?.name} is an {album?.album_type} by {artist?.join(",")} with an {album?.total_tracks} track(s)`</p>
    </div>
    <div className="album-release">
   <p>Release Date:{album?.release_date}</p>
    </div>
  </div>
  )
}
