import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useStateProvider } from '../utils/StateProvider';

function PlayBack( {uri,state} ) {
  const [{ token, selectedUri }, dispatch] = useStateProvider();
  
  useEffect(() => {

    // const getLastPlayedTrack = async () => {
    //   const response = await axios.put(
    //     `https://api.spotify.com/v1/me/player/play`, {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: "Bearer " + token,
    //       },
    //     }, {
    //       uris: ["spotify:track:5PE2TkQKrgcLZupVGe5Pxu"]
    //     }
    //   );
    //   dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    // };
    //getLastPlayedTrack(); 
  }, [token, dispatch])

  return (
    <SpotifyPlayer
      token={token}
      play={state}
      uris= {uri}
      magnifySliderOnHover
      showSaveIcon
      initialVolume={.5}
      syncExternalDevice= {true}
      autoPlay={false}
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