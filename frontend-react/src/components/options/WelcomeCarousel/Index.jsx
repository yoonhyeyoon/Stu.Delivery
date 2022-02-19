import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  display: ${(props) =>
    !props.displayState && props.frameIndex !== 0 ? "none" : "unset"};
  position: absolute;
  width: 100%;
  height: 700px;
  z-index: ${(props) =>
    props.currentIndex === props.frameIndex
      ? 1
      : props.currentIndex + 1 === props.frameIndex ||
        props.currentIndex - props.maxIndex === props.frameIndex
      ? 2
      : 0};
  transition: transform
      ${(props) =>
        props.currentIndex === props.frameIndex ||
        props.currentIndex === props.frameIndex - 1 ||
        (props.currentIndex === props.maxIndex && props.frameIndex === 0)
          ? `.5s`
          : `0s`}
      cubic-bezier(0.45, 0.035, 0.045, 0.95),
    left 0.5s;
  cursor: ${(props) =>
    props.frameIndex === props.currentIndex ? "default" : "pointer"};
  @media only screen and (min-width: 768px) {
    left: ${(props) => (props.overIndex === props.frameIndex ? -40 : 0)}px;
    transform: translateX(
      ${(props) =>
        props.currentIndex === props.frameIndex ||
        props.currentIndex - 1 === props.frameIndex ||
        (props.currentIndex === 0 && props.frameIndex === 3)
          ? 0
          : props.currentIndex + 1 === props.frameIndex ||
            props.currentIndex - props.maxIndex === props.frameIndex
          ? props.windowWidth - 76
          : (props.windowWidth - 76) * 2}px
    );
  }
  @media only screen and (min-width: 1280px) {
    left: ${(props) => (props.overIndex === props.frameIndex ? -60 : 0)}px;
    transform: translateX(
      ${(props) =>
        props.currentIndex === props.frameIndex ||
        props.currentIndex - 1 === props.frameIndex ||
        (props.currentIndex === 0 && props.frameIndex === 3)
          ? 0
          : props.currentIndex + 1 === props.frameIndex ||
            props.currentIndex - props.maxIndex === props.frameIndex
          ? props.windowWidth - 116
          : (props.windowWidth - 116) * 2}px
    );
  }
`;

const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const HomeTextFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
`;

const Index = ({
  windowHeight,
  windowWidth,
  maxIndex,
  displayState,
  frameIndex,
  overIndex,
  setOverIndex,
  currentIndex,
  setCurrentIndex,
  carouselSrc,
  setDisplayState,
}) => {
  const commonProps = {
    windowHeight,
    windowWidth,
    currentIndex,
    maxIndex,
    overIndex,
    displayState,
    setDisplayState,
  };

  const onMouseOver = ({ index }) => {
    if (
      currentIndex === index - 1 ||
      (currentIndex === maxIndex && index === 0)
    ) {
      setOverIndex(index);
    }
  };

  const onMouseLeave = ({ index }) => {
    setOverIndex(-1);
  };

  const onMouseClick = ({ index }) => {
    setCurrentIndex(index);
    setOverIndex(-1);
  };

  return (
    <Container
      onMouseOver={() => {
        onMouseOver({ index: frameIndex });
      }}
      onMouseLeave={() => {
        onMouseLeave({ index: frameIndex });
      }}
      onClick={() => {
        onMouseClick({ index: frameIndex });
      }}
      {...{
        ...commonProps,
        frameIndex,
      }}
    >
      <ImageFrame>
        <img src={carouselSrc} layout="fill" objectFit="cover" quality="100" />
      </ImageFrame>
    </Container>
  );
};

export default Index;
