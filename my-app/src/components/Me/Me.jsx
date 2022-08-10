import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
//import { reducerCases } from "../../utils/Constant";
import { useStateProvider } from "../../utils/StateProvider";

export default function Me() {
  const [{ token }, dispatch] = useStateProvider();
  let userNumber = .52; 
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
      calculateDance();
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

    const calculateDance = () => 
    {
      let i = 0; let j =0;
      while(true)
      {
        let newDistance = Math.abs(danceabilities[i]-userNumber);
        if(i===danceabilities.length)
        {
          break;
        }
        else if(distance > newDistance)
        {
          distance = newDistance;
          j=i;
          i=0;
          continue;
        }       
        else
        {
          i++;
        }
      }
      console.log(userNumber, j, danceabilities);
    }

  }, [token, dispatch]);

  return (
    <Container>
      <h1>Hey Welcome, {userName}!</h1>
       {/* <ul>
        {danceabilities.map(items => <li> {items} </li>)}
      </ul> */}
      <img src={userProfileImage} />
      <label for="dance">On a scale of 1<small>(Less)</small> to 10<small>(More)</small>. How much are you wanting to dance: </label><br></br>
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
      
    </Container>
  );
};

const Container = styled.div`
  display: block;
  height: 100%;
  width: 100%;
  font-family: "Raleway";
  font-size: 25px;
  padding: .1px 10px;
  color: white;
  background: url('https://images.pexels.com/photos/341858/pexels-photo-341858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat ;
  background-size: cover;
  img {
    height: 20vh;
    width: 20vh;
    float: left;
    margin: 20px 100px;
  }
  small {
    font-size: 10px;
  }

  input {
    align-items: center;
    appearance: none;
    background-color: #fff;
    border-radius: 24px;
    border-style: none;
    color: #3c4043;
    cursor: pointer;
    display: inline-flex;
    fill: currentcolor;
    font-family: Roboto,Arial;
    font-size: 14px;
    font-weight: 200;
    height: 45px;
    justify-content: center;
    letter-spacing: .8px;
    line-height: normal;
    max-width: 100%;
    overflow: visible;
    padding: 10px 20px;
    
  }
  select 
  {
    width: 100%;
    max-width: 200px;
    height: 38px;
    padding: 5px 30px;
    font-size: 15px;
    color: black;
    background-color: #ffffff;
    border: 2px solid #cccccc;
  }
`;
