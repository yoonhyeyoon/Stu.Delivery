import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import WelcomeCarousel from "../options/WelcomeCarousel/Index";
import color from "../../common/styles/theme";
import { keyframes } from "@emotion/react";
import recafe1 from "../../assets/images/welcome/recafe1.png";
import recafe2 from "../../assets/images/welcome/recafe2.png";
import recafe6 from "../../assets/images/welcome/recafe6.png";
import recafe8 from "../../assets/images/welcome/recafe8.png";
import Typed from "typed.js";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  overflow-x: hidden;
  background-color: black;
`;

const HomeTextFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* font-weight: 700; */
  margin-left: 60px;
  margin-bottom: 60px;
  z-index: 1;
  cursor: default;
  transition: all 0.35s;
  @media only screen and (min-width: 768px) {
    font-size: 60px;
  }
  @media only screen and (min-width: 1280px) {
    font-size: 80px;
  }
`;

const TextBox = styled.div`
  color: ${color.white.default};
  transition: all 0.3s;
`;

const TextChangeFrame = styled.div`
  margin: -20px 0px;
  position: relative;
  width: 900px;
  @media only screen and (min-width: 768px) {
    height: 100px;
  }
  @media only screen and (min-width: 1280px) {
    height: 120px;
  }
`;

const TextBoxOpacity = styled.div`
  margin-left: 40px;
  position: absolute;
  display: flex;
  color: ${color.white.default};
  opacity: 0;
  margin-top: 40px;
  transition: all 0.3s;
`;

const TextKeyword = styled.div`
  transition: all 0.3s;
`;

const TextEnd = styled.div``;

const SwiperBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const SwiperPoint = styled.div`
  margin: 0px 10px;
  background-color: ${color.gray.light};
  opacity: 0.2;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  transition: all 0.3s;
  cursor: pointer;
`;

const scroll = keyframes`
  0% {
    margin-top: 12px;
    height: 5px;
  }
  20% {
    margin-top: 12px;
    height: 10px;
  }
  40% {
    margin-top: 15px;
    height: 7px;
  }
  60% {
    margin-top: 17px;
    height: 5px;
  }
  100% {
    margin-top: 12px;
    height: 5px;
  }
`;

const ScrollIcon = styled.div`
  position: absolute;
  bottom: 20px;
  left: 49%;
  width: 32px;
  height: 56px;
  border: 2px solid ${color.white.default};
  border-radius: 20px;
  display: flex;
  justify-content: center;
`;

const ScrollPoint = styled.div`
  margin-top: 10px;
  width: 4px;
  height: 8px;
  background-color: ${color.white.default};
  border-radius: 4px;
  animation: ${scroll} 1s ease-out infinite;
`;

const HomeTop = ({
  windowHeight,
  windowWidth,
  displayState,
  setDisplayState,
}) => {
  const [overIndex, setOverIndex] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = 3;
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["코드를 같이 작업", "일정을 같이 공유"],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <Container style={{ height: windowHeight }}>
      <WelcomeCarousel
        windowHeight={windowHeight}
        windowWidth={windowWidth}
        currentIndex={currentIndex}
        maxIndex={maxIndex}
        overIndex={overIndex}
        displayState={displayState}
        frameIndex={0}
        carouselSrc={recafe1}
        setOverIndex={setOverIndex}
        setCurrentIndex={setCurrentIndex}
        setDisplayState={setDisplayState}
      />
      <WelcomeCarousel
        windowHeight={windowHeight}
        windowWidth={windowWidth}
        currentIndex={currentIndex}
        maxIndex={maxIndex}
        overIndex={overIndex}
        displayState={displayState}
        frameIndex={1}
        carouselSrc={recafe2}
        setOverIndex={setOverIndex}
        setCurrentIndex={setCurrentIndex}
        setDisplayState={setDisplayState}
      />
      <WelcomeCarousel
        windowHeight={windowHeight}
        windowWidth={windowWidth}
        currentIndex={currentIndex}
        maxIndex={maxIndex}
        overIndex={overIndex}
        displayState={displayState}
        frameIndex={2}
        carouselSrc={recafe6}
        setOverIndex={setOverIndex}
        setCurrentIndex={setCurrentIndex}
        setDisplayState={setDisplayState}
      />
      <WelcomeCarousel
        windowHeight={windowHeight}
        windowWidth={windowWidth}
        currentIndex={currentIndex}
        maxIndex={maxIndex}
        overIndex={overIndex}
        displayState={displayState}
        frameIndex={3}
        carouselSrc={recafe8}
        setOverIndex={setOverIndex}
        setCurrentIndex={setCurrentIndex}
        setDisplayState={setDisplayState}
      />
      <HomeTextFrame>
        <TextDiv>
          <TextBox>스터디원과</TextBox>
          <TextChangeFrame>
            <TextBoxOpacity
              style={{ opacity: 1, color: color.white.default, marginTop: 12 }}
            >
              <TextKeyword
                ref={el}
                style={
                  overIndex === currentIndex + 1 ||
                  (overIndex === 0 && currentIndex === maxIndex)
                    ? { marginLeft: -40, color: color.yellow.default }
                    : { color: color.yellow.default }
                }
              ></TextKeyword>
              <TextEnd>하며</TextEnd>
            </TextBoxOpacity>
            {/* <TextBoxOpacity
              style={
                currentIndex === 1
                  ? { opacity: 1, color: color.white.default, marginTop: 12 }
                  : null
              }
            >
              <TextKeyword
                style={
                  overIndex === currentIndex + 1 ||
                  (overIndex === 0 && currentIndex === maxIndex)
                    ? { marginLeft: -40, color: color.pink.default }
                    : { color: color.pink.default }
                }
              >
                문서를 같이
              </TextKeyword>
              <TextEnd>공유하며</TextEnd>
            </TextBoxOpacity>
            <TextBoxOpacity
              style={
                currentIndex === 2
                  ? { opacity: 1, color: color.white.default, marginTop: 12 }
                  : null
              }
            >
              <TextKeyword
                style={
                  overIndex === currentIndex + 1 ||
                  (overIndex === 0 && currentIndex === maxIndex)
                    ? { marginLeft: -40, color: color.red.default }
                    : { color: color.red.default }
                }
              >
                보드를 같이
              </TextKeyword>
              <TextEnd>그리며</TextEnd>
            </TextBoxOpacity>
            <TextBoxOpacity
              style={
                currentIndex === 3
                  ? { opacity: 1, color: color.white.default, marginTop: 12 }
                  : null
              }
            >
              <TextKeyword
                style={
                  overIndex === currentIndex + 1 ||
                  (overIndex === 0 && currentIndex === maxIndex)
                    ? { marginLeft: -40, color: color.homeTag.i }
                    : { color: color.homeTag.i }
                }
              >
                일정을 같이
              </TextKeyword>
              <TextEnd>공유하며</TextEnd>
            </TextBoxOpacity> */}
          </TextChangeFrame>
          <TextBox
            style={
              overIndex === currentIndex + 1 ||
              (overIndex === 0 && currentIndex === maxIndex)
                ? { marginLeft: 0 }
                : { marginLeft: 80 }
            }
          >
            실시간으로 소통하세요
          </TextBox>
          <SwiperBox>
            <SwiperPoint
              style={
                currentIndex === 0
                  ? { opacity: 1, backgroundColor: color.yellow.default }
                  : null
              }
              onClick={() => setCurrentIndex(0)}
            />
            <SwiperPoint
              style={
                currentIndex === 1
                  ? { opacity: 1, backgroundColor: color.pink.default }
                  : null
              }
              onClick={() => setCurrentIndex(1)}
            />
            <SwiperPoint
              style={
                currentIndex === 2
                  ? { opacity: 2, backgroundColor: color.blue.default }
                  : null
              }
              onClick={() => setCurrentIndex(2)}
            />
            <SwiperPoint
              style={
                currentIndex === 3
                  ? { opacity: 3, backgroundColor: color.green.dark }
                  : null
              }
              onClick={() => setCurrentIndex(3)}
            />
            <ScrollIcon>
              <ScrollPoint></ScrollPoint>
            </ScrollIcon>
          </SwiperBox>
        </TextDiv>
      </HomeTextFrame>
    </Container>
  );
};

export default HomeTop;
