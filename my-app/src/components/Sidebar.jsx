import React from 'react'
import styled from 'styled-components';
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import Playlists from './Playlists';
function Sidebar({setSearchDetails}) {
  return (
    <Container>
      <div className="top__links">
          <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"alt="spotify" />
      </div>
      {/* <Playlists setSearchDetails={setSearchDetails} /> */}
    </Container>
  )
}

export default Sidebar;
const Container = styled.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
  }
`;