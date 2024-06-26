import React, { useState } from "react";
import gsap from "gsap";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  background-color: white;
`;

const Pokeball = styled.div``;

const commonShadowParams = `3rem -1rem red`;
const rotateCoord = 10;

const rotateShadow = keyframes`
  0% {
    box-shadow: 0 -${rotateCoord * 1.5}px ${commonShadowParams};
  }
  12% {
    box-shadow: ${rotateCoord}px -${rotateCoord}px ${commonShadowParams};
  }
  25%{
    box-shadow: ${rotateCoord * 1.5}px 0px ${commonShadowParams};
  }
  37% {
    box-shadow: ${rotateCoord}px ${rotateCoord}px ${commonShadowParams};
  }
  50%{
    box-shadow: 0px ${rotateCoord * 1.5}px ${commonShadowParams};
  }
  62% {
    box-shadow: -${rotateCoord}px ${rotateCoord}px ${commonShadowParams};
  }
  75% {
    box-shadow: -${rotateCoord * 1.5}px 0px ${commonShadowParams};
  }
  87.5% {
    box-shadow: -${rotateCoord}px -${rotateCoord}px ${commonShadowParams};
  }
  100% {
    box-shadow: 0px -${rotateCoord * 1.5}px ${commonShadowParams};
  }
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15rem;
  height: 15rem;
  border-radius: 50%;

  animation: ${rotateShadow} 2s linear infinite forwards;
`;

const ProgressText = styled.div`
  color: darkred;
`;

export const LoadingView = () => {
  const [progress, setProgress] = useState(30);
  return (
    <Container>
      <Circle>
        <ProgressText>{progress}%</ProgressText>
      </Circle>
    </Container>
  );
};
