import { Link, useLocation } from "react-router-dom";
import "./styles.scss";
export default function Sidebarbutton({title,to,icons}) {
const location=useLocation();

const isActive=location.pathname===to

  return (
   <Link to={to}>
     <div className={`sideBarButton ${isActive? "active":""} ` } >
      
      <div className="icons">{icons}</div>
      <p className="text">{title}</p>
      </div>
     
   </Link>
  )
}
