import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from "../utils/Constant";

function PlayBack({uri}) {
  const [{ token, selectedUri }, dispatch] = useStateProvider();
  const [playerState, setPlayerState] = useState(false);
  
  useEffect(() => {
    const getLastPlayedTrack = async () => {
      const response = await axios.put(
        `https://api.spotify.com/v1/me/player/play`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }, {
          uris: ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh"]
        }
      );
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    };
    
    getLastPlayedTrack(); 
  }, [token, dispatch])

  return (
    <SpotifyPlayer
      token={token}
      uris="spotify:track:4iV5W9uYEdYUVa79Axb7Rh"
      magnifySliderOnHover
      showSaveIcon
      //name={"Web Player"}
      initialVolume={.5}
      syncExternalDevice= {true}
      autoPlay={true}
      play={playerState}
      styles={
        {
        bgColor: '#181818',
        color: '#1db954',
        activeColor: '#1db954',
        sliderColor: '#1cb954',
        trackArtistColor: '#ccc',
        trackNameColor: '#fff',
        height: "10vh",
        loaderColor: "#1db954",
        //sliderTrackBorderRadius: "20px",
      }
    }
    />
  )
}
export default PlayBack;