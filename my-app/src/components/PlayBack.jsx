import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useStateProvider } from '../utils/StateProvider';
//import { calculateDance } from './Me/Me';
function PlayBack() {
  const [{ token, selectedUri }] = useStateProvider();

  const [uri, setUri] = useState([]);
  const [playerState, setPlayerState] = useState(false);
  
  useEffect(() => {
    const getLastPlayedTrack = async () => {
      const response = await axios.put('https://api.spotify.com/v1/me/player/play', {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: 
          {"uris": ["spotify:track:2vWBUC9djv6BtiGlmKiQaH"]}
      })
      
    }
    setUri(uri);
    getLastPlayedTrack(); 
  }, [token])

  return (
    <SpotifyPlayer
      token={token}
      uris={selectedUri ? [selectedUri] : [uri]}
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