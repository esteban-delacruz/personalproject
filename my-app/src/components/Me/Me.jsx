import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { reducerCases } from "../../utils/Constant";
import { useStateProvider } from "../../utils/StateProvider";

export default function Me() {
  const [{ token }, dispatch] = useStateProvider();
  let userNumber = .5;


  // Grabbing About Me
  const [userName, setUserName] = useState("");
  const [userProfileImage, setProfileImage] = useState();

  // Grabbing Top Tracks
  const [topTracks, setTopTracks] = useState([]);

  // Audio Features
  const [audioFeatures, setAudioFeatures] = useState("");
  const [danceabilities, setDanceabilities ] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      //console.log(response.data);
      setUserName(response.data.display_name);
      setProfileImage(response.data.images[0] ? response.data.images[0].url : 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg');
    };

    const getTopTracks = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      for(let i = 0;i<response.data.items.length;i++)
      {
        //setTopTracks(response.data.items[i].id);
        getTrackAudioFeatures(response.data.items[i].id);
      }
    };

    const getTrackAudioFeatures = async (id) => {
      const response = await axios.get(
        `https://api.spotify.com/v1/audio-features/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      setDanceabilities(danceabilities => [...danceabilities,response.data.danceability]);
    };

    getUserData();
    getTopTracks();
    
    const calculateDance = () => {
      console.log(userNumber);
    }
  
    calculateDance();

  }, [token, dispatch]);

  

  return (
    <Container>
      <h1>Hey Welcome, {userName}!</h1>
      {/* <ul>
        {danceabilities.map(items => <li> {items} </li>)}
      </ul> */}
      <img src={userProfileImage} />
    </Container>
  );
};

const Container = styled.div`
  height: 400px;
  width: 100%;
  background-color: #181818;
  border-top: 1px solid #282828;
  align-items: center;
  justify-content: center;
`;
