import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import "./me.css";
import { useStateProvider } from "../../utils/StateProvider";

export default function Me() {
  const [{ token }, dispatch] = useStateProvider();

  // Grabbing About Me
  const [userName, setUserName] = useState("");
  const [userProfileImage, setProfileImage] = useState();

  // Grabbing Top Tracks
  const [topTracks, setTopTracks] = useState([]);

  // Grabbing Audio Features
  //const [audioFeatures, setAudioFeatures] = useState("");
  const [danceabilities, setDanceabilities ] = useState([]);

  // Grabbing DanceValue from Event Listener
  const [danceValue, setDanceValue] = useState(0);
  const [uri, setUri] = useState("spotify:track:4iV5W9uYEdYUVa79Axb7Rh");
  const [state, setState] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      return await axios.get("https://api.spotify.com/v1/me/", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }).then((response) => {
          setUserName(response.data.display_name);    
          setProfileImage(response.data.images[0] ? response.data.images[0].url : 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg');    
        });
    };

    const getTopTracks = async () => {
      return await axios.get("https://api.spotify.com/v1/me/top/tracks", {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
              params: { 
                limit: 50
              } 
            }
      ).then((response) => {
        setTopTracks(response.data.items);
        for(let i = 0;i<response.data.items.length;i++) {
          getTrackAudioFeatures(response.data.items[i].id);
        }
      });
    };

    const getTrackAudioFeatures = async (id) => {
      return await axios.get(`https://api.spotify.com/v1/audio-features/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        setDanceabilities(danceabilities => [...danceabilities, response.data.danceability]);
      });
    };

    getUserData();
    getTopTracks();
  }, [token, dispatch]);
  
  const calculateDance = () => {
    let j = 0;
    let distance = 1;
    
    for(let i=0;i<danceabilities.length;i++) 
    {
      let newDistance = Math.abs(danceabilities[i] - danceValue)
      if(distance > newDistance) {
        j=i;
        distance = newDistance;
        continue;
      }
    }
    setBackgroundImage(topTracks[j].album.images[0].url);
    setUri(topTracks[j].uri);
    setState(true);
  }; 

  const onSelectDanceValue = (event) => {
    setDanceValue(event.target.value)
  } ;

  return (
    <div className='main-container'>
      <div className='album-art' style={ {backgroundImage: `url(${backgroundImage})`}}></div>
      <div className='main-content'>
        <h1>Hey Welcome, {userName}!</h1>
        <img className='img1' alt='profileImage' src={userProfileImage} />
        <label htmlFor="dance">On as scale of 1<small>(Less)</small> to 10<small>(More)</small>. How much are you wanting to dance: </label><br></br>
        <select onChange={onSelectDanceValue} name="dance" id="dance">
          <option value={.3}>1</option>    
          <option value={.35}>2</option>
          <option value={.4}>3</option>
          <option value={.45}>4</option>
          <option value={.5}>5</option>
          <option value={.55}>6</option>
          <option value={.6}>7</option>
          <option value={.65}>8</option>
          <option value={.75}>9</option>
          <option value={.85}>10</option>
        </select>
        <br></br>
        <input onClick={calculateDance} type="submit" value="Submit"/>
      </div>
      <div className="spotify-footer">
        <Footer uri={uri} state = {state} />
      </div>
    </div>
    
  )
};


