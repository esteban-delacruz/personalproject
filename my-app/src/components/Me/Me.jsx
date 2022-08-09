import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
//import { reducerCases } from "../../utils/Constant";
import { useStateProvider } from "../../utils/StateProvider";

export default function Me() {
  const [{ token }, dispatch] = useStateProvider();
  let userNumber = .37; 
  let distance = 10;


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

    const calculateDance = async () => 
    {
      let i = 0; let j =0;
      while(true)
      {
        let newDistance = Math.abs(danceabilities[i]-userNumber);
        if(i==danceabilities.length)
        {
          break;
        }
        else if(distance > newDistance)
        {
          distance = newDistance;
          j=i+1;
          i=0;
          continue;
        }       
        else
        {
          i++;
        }
      }
      console.log(userNumber, j);
    }
    calculateDance();
  }, [token, dispatch]);

  return (
    <Container>
      <h1>Hey Welcome, {userName}!</h1>
       {/* <ul>
        {danceabilities.map(items => <li> {items} </li>)}
      </ul> */}
      <h3>
      <label for="dance">On a scale of 1(Less) to 10(More)<br></br> How much are you wanting to dance: </label></h3><br></br>
      <select name="dance" id="dance">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <input type="submit" value="Submit"/>
      <img src={userProfileImage} />
    </Container>
  );
};

const Container = styled.div`
  height: 500px;
  font-family: "Raleway";
  font-size: 30px;
  width: 100%;
  color: white;
  background-color: #181818;
  border-top: 1px solid #282828;
  text-align: center;
  
  justify-content: center;
  img {
    height: 20vh;
    width: 20vh;
  }
  input {
    align-items: center;
    appearance: none;
    background-color: #fff;
    border-radius: 24px;
    border-style: none;
    box-shadow: rgb(0 0 0 / 20%) 0 3px 5px -1px, rgb(0 0 0 / 14%) 0 6px 10px 0, rgb(0 0 0 / 12%) 0 1px 18px 0;
    box-sizing: border-box;
    color: #3c4043;
    cursor: pointer;
    display: inline-flex;
    fill: currentcolor;
    font-family: "Google Sans",Roboto,Arial,sans-serif;
    font-size: 14px;
    font-weight: 500;
    height: 48px;
    justify-content: center;
    letter-spacing: .25px;
    line-height: normal;
    max-width: 100%;
    overflow: visible;
    padding: 2px 24px;
    position: relative;
    text-align: center;
    text-transform: none;
  }
  select 
  {
    display: flex;
    width: 100%;
    max-width: 300px;
    height: 40px;
    float: none;
    
    padding: 0px 30px;
    font-size: 19px;
    
    color: black;
    background-color: #ffffff;
    border: 2px solid #cccccc;
    
  }
`;
