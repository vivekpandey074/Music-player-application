
import "./AlbumImage.scss";



export default function AlbumImage({url}) {
  return (

      <div className="albumImage flex">
        <img src={url} alt="album-art" className="albumImage-art"/>
        <img src={url} alt="shadow" className="albumImage-shadow"/> 
      </div>
  )
}
