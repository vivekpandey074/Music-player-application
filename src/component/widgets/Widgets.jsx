import { useState } from "react";
import "./styles.scss";
import { useEffect } from "react";
import apiClient from "../../spotify";
import WidgetCard from "./WidgetCard";

export default function Widgets({artistID}) {
  const [similar,setSimilar]=useState([]);
  const [featured,setFeatured]=useState([]);
  const [newRelease, setNewRelease]=useState([]);

  useEffect(()=>{
   if(artistID){
    apiClient.get(`/artists/${artistID}/related-artists`)
    .then(res=>{
        const a=res.data?.artists.slice(0,3);
        
        setSimilar(a);
    }).catch(err=>console.error(err));
 
    apiClient.get(`/browse/new-releases`)
    .then(res=>{
        const a=res.data?.albums.items.slice(0,3);
     
        setNewRelease(a);
    }).catch(err=>console.error(err));
 
    apiClient.get(`/browse/featured-playlists`)
    .then(res=>{
        const a=res.data?.playlists.items.slice(0,3);
        setFeatured(a);
    }).catch(err=>console.error(err));
 
   }
},[artistID])




    return (
    <div className="Widgets-body">
    <WidgetCard title="Similar Artists" similar={similar}/>
    <WidgetCard title="Made For you" featured={featured}/>
    <WidgetCard title="New releases" newRelease={newRelease}/>
        </div>
  )
}
