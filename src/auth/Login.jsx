import { useEffect, useState } from "react";
import { loginEndpoint } from "../spotify";
import "./styles.scss";
import $ from 'jquery';

const apiKey ='oUpUN8J7sNFNvk7DbyzUqdw0MNPHoT6pGA1xCtHM';
const category = 'happiness';

export default function Login() {
  const [quote,setQuote]=useState("");  

  useEffect(()=>{
    $.ajax({
        method: 'GET',
        url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
        headers: { 'X-Api-Key': `${apiKey}`},
        contentType: 'application/json',
        success: function(result) {
         
           setQuote(result)
        },
        error: function ajaxError(jqXHR) {
            alert('Error: ', jqXHR.responseText);
        }
    });

  },[])


  return (
    <div className="loginpage">

        <img src="src\assets\loginbackground.jpg" alt="" className="backdrop-img"/>
        <img src="src\assets\musiccolor.png" alt="logo" className="logo"/>
        <div className="quote-box">
        <div >{quote[0]?.quote}</div>
        <div className="author" >-{quote[0]?.author}</div>
        </div>
       <a href={loginEndpoint}>
        <div className="login-btn">LOGIN</div>
        </a>    
    </div>
  )
}
