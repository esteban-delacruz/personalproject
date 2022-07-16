import React from 'react';
import styled from 'styled-components';

const handleClick = () => {
   const clientID = "b36f8776751d4c9489e146593f90722c";
   //const response_type = 'code';
   const redirectUrl = "http://localhost:3000/callback";
   const apiUrl = "https://accounts.spotify.com/authorize";
   const scope = ["user-read-email","user-read-private","ugc-image-upload","user-modify-playback-state","user-read-playback-state","user-read-currently-playing","user-read-recently-played","user-read-playback-position","user-top-read"];
   window.location.href = `${apiUrl}?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;
};
export default function Login() {
  return (
    <Container> 
    <img src = 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png' alt = 'spotify logo' />
    <button onClick ={handleClick}> Connect Spotify </button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgb(30,200,96);
  gap: 5rem;
  img 
  {
    height: 20vh;
  }
    button 
    {
        padding: 1rem 5rem;
        border-radius: 5rem;
        border: none;
        background-color: black;
        color: #49f585;
        font-size: 1.4rem;
        cursor: pointer;
    }
`;