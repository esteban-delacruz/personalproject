import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { reducerCases } from "../../utils/Constant";
import { useStateProvider } from "../../utils/StateProvider";

export default function Me() {
  const [{ token }, dispatch] = useStateProvider();
  const [userName, setUserName] = useState("");
  const [userProfileImage, setProfileImage] = useState();
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
      setProfileImage(response.data.images.url);
    };
    getUserData();
  }, [token, dispatch]);
  return (
    <Container>
      <h1>{userName}</h1>
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
