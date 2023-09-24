import axios from "axios";



const authEndpoint="https://accounts.spotify.com/authorize?";
const clientID="bf40c1c3fcad4ead9d16720da59e401b";
// const redirectUri="http://localhost:5173";
const redirectUri="https://rough-music-player.netlify.app/"
const scopes=["user-library-read", "playlist-read-private"];

export const loginEndpoint= `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;

const apiClient=axios.create({
    baseURL:"https://api.spotify.com/v1/",
})

export const setClientToken=(token)=>{
    apiClient.interceptors.request.use(async function(config){
        config.headers.Authorization="Bearer "+ token;
        return config;
    })
}

export default apiClient;