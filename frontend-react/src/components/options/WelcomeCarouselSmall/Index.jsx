import React from "react";
import styled from "@emotion/styled";
import color from "../../../common/styles/theme";

const Container = styled.div`
  display: ${(props) =>
    !props.displayState && props.frameIndex !== 0 ? "none" : "unset"};
  position: absolute;
  left: ${(props) => (props.overIndex === props.frameIndex ? -20 : 0)}px;
  width: 100%;
  height: 100%;
  transform: translateX(
    ${(props) =>
      props.currentIndex === props.frameIndex ||
      props.currentIndex - 1 === props.frameIndex ||
      (props.currentIndex === 0 && props.frameIndex === 3)
        ? 0
        : props.currentIndex + 1 === props.frameIndex ||
          props.currentIndex - props.maxIndex === props.frameIndex
        ? props.windowWidth - 36
        : (props.windowWidth - 36) * 2}px
  );
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
`;

const ImageFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BgOpacityFrame = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${color.black.default};
  opacity: ${(props) => (props.frameIndex === props.currentIndex ? 0.2 : 0.7)};
  transition: opacity 0.3s;
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
        <BgOpacityFrame
          {...{
            ...commonProps,
            frameIndex,
          }}
        />
      </ImageFrame>
    </Container>
  );
};

export default Index;
