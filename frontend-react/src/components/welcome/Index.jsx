import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import WelcomeTop from "./WelcomeTop";
import WelcomeTopSmall from "./WelcomeTopSmall";
import Description from "./Description";
import Footer from "./Footer";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
`;

const HomeSubContainer = styled.div`
  width: 100%;
`;

const Index = () => {
  const [windowHeight, setWindowHeight] = useState();
  const [windowWidth, setWindowWidth] = useState();
  const [displayState, setDisplayState] = useState(false);

  useEffect(function mount() {
    const resizeHandler = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    resizeHandler();

    setTimeout(() => {
      setDisplayState(true);
    }, 1);

    window.addEventListener("resize", resizeHandler);

    const cleanup = () => {
      window.removeEventListener("resize", resizeHandler);
    };

    return cleanup;
  });

  return (
    <Container>
      {windowWidth > 768 && (
        <WelcomeTop
          windowHeight={windowHeight}
          windowWidth={windowWidth}
          displayState={displayState}
          setDisplayState={setDisplayState}
        ></WelcomeTop>
      )}{" "}
      {windowWidth <= 768 && (
        <WelcomeTopSmall
          windowHeight={windowHeight}
          windowWidth={windowWidth}
          displayState={displayState}
          setDisplayState={setDisplayState}
        ></WelcomeTopSmall>
      )}
      <HomeSubContainer>
        <Description></Description>
        <Footer></Footer>
      </HomeSubContainer>
    </Container>
  );
};

export default Index;
