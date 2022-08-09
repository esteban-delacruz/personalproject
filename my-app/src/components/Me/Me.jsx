import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { reducerCases } from "../../utils/Constant";
import { useStateProvider } from "../../utils/StateProvider";

export default function Me() {
  const [{ token }, dispatch] = useStateProvider();

  // Grabbing About Me
  const [userName, setUserName] = useState("");
  const [userProfileImage, setProfileImage] = useState();

  // Grabbing Top Tracks
  const [topTracks, setTopTracks] = useState([]);
  let danceabilities = [];

  // Audio Features
  const [audioFeatures, setAudioFeatures] = useState("");


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
      console.log(response.data);
      setUserName(response.data.display_name);
      setProfileImage(response.data.images[0].url);
      //setProfileImage(response.data.images[0] ? response.data.images[0].url : null);
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
        setTopTracks(response.data.items[i].id);
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
      danceabilities.push(response.data.danceability);
    };

    getUserData();
    getTopTracks();
    console.log(danceabilities);
  }, [token, dispatch]);

  
  return (
    <Container>
      <h1>{userName}</h1>
      <p> {danceabilities} </p>
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
