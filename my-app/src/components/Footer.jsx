import React, { useState } from "react";
import styled from "styled-components";
import PlayBack from "./PlayBack";

export default function Footer( {uri,state} ) {
  //console.log(state);
  return (
    <div>
      <PlayBack uri={uri} state = {state} />
    </div>
  );
}
const Container = styled.div`
  height: 100%;
  width: 100%;
  background-color: #181818;
  align-items: center;
  justify-content: center;
`;