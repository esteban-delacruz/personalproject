import React from 'react'
import styled from 'styled-components';
import {IoLibrary} from 'react-icons/io5';
import { MdHomeFilled, MdSearch} from 'react-icons/md';

export default function Sidebar() {
  return (
  <Container> 
    <div className='top_link'>
        <div className='logo'> 
            <img src = 'https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png' alt = 'spotify logo' />
        </div>
        <ul>
            
            <li> <MdHomeFilled/><span> Home</span></li>          
            <li> <MdSearch/><span> Search</span></li>
            <li> <IoLibrary/><span> Playlist</span></li>
        </ul>
    </div>
  </Container>
  );
}

const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top_link{
    display: flex;
    flex-direction: column;
  }
  .logo{
    text-align: center;
    margin: 1rem 0;
  }
  img{
    max-inline-size: 90%;
    block-size: auto;
  }
  ul{
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;