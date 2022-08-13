import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { useStateProvider } from '../utils/StateProvider';

function PlayBack( {uri,state} ) {
  const [ { token } ] = useStateProvider();
  

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
      }
    }
    />
  )
}
export default PlayBack;