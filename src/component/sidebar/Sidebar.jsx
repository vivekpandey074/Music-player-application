import Sidebarbutton from "./sidebarbutton/Sidebarbutton"
import "./styles.scss"
import { BiTrendingUp, BiLibrary, BiLogOut} from "react-icons/bi";
import {FcLikePlaceholder} from "react-icons/fc";
import {BsLayoutTextWindow} from "react-icons/bs";
import {TbPlayerPlayFilled} from "react-icons/tb";
import {AiOutlineHeart} from "react-icons/ai";
import {VscSignOut} from "react-icons/vsc";
import { useEffect, useState } from "react";
import apiClient from "../../spotify";
import default_avaatar_img from "../../assets/avaatar.jpg";





export default function Sidebar() {
 const [image, setImage]=useState(default_avaatar_img)

  useEffect(()=>{
   apiClient.get("me").then(response=>{
    
    setImage(response?.data?.images[0].url);
   
    
   }).catch(error=>{
    if(error.message.slice(error.message.length-3,error.message.length)==401){
      alert("Session has expired logging in again...")
      localStorage.removeItem("token")
      window.location.reload();
    }
   })
  },[])




  return (
    <div className="sidebar-container">
      <img src={image} alt="Profile" className="profile-image"/>
      <Sidebarbutton title="Trending" to="/trending" icons={<BiTrendingUp/>}/>
      
      <Sidebarbutton title="Library" to="/" icons={<BiLibrary/>}/>
      <Sidebarbutton title="Player" to="/player" icons={<TbPlayerPlayFilled/>}/>
      <Sidebarbutton title="Favourites" to="/favourites" icons={<AiOutlineHeart/>}/>
      <VscSignOut  onClick={function(){localStorage.removeItem("token");
      window.location.reload();
    }} className="signout"/>
    <p style={{cursor:"pointer", fontFamily:"cursive"}}>Signout</p>
      
     
      
    </div>
  )
}
