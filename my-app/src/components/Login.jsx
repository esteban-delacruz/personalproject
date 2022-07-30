import React from 'react';
import styled from 'styled-components';

const handleClick = () => {
   const clientID = "b36f8776751d4c9489e146593f90722c";
   //const response_type = 'code';
   const redirectUrl = "http://localhost:3000/callback";
   const apiUrl = "https://accounts.spotify.com/authorize";
   const scope = ["streaming",
   "user-library-read",
   "user-library-modify",
   "user-read-private",
   "user-read-email",
   "user-modify-playback-state",
   "user-read-playback-state",
   "user-read-currently-playing",
   "user-read-recently-played",
   "user-top-read",];
   window.location.href = `${apiUrl}?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
};
export default function Login() {
  return (
    <Container> 
    <img src = 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png' alt = 'spotify logo' />
    <button onClick ={handleClick}> Connect Spotify </button>
    <div className='watermark'> 2022 -- Tommy Ngo Spotify API (Last Updated: 7/25/22)</div>
    </Container>
  );
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 100vh;
width: 100vw;
background-color: #202020;
gap: 5rem;
img {
  height: 20vh;
}
button {
  padding: 1rem 5rem;
  border-radius: 5rem;
  background-color: black;
  color: white;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
}
div {
  font-size: 20px;
  color: white;
  
}
`;