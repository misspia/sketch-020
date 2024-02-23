import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { colors, fonts } from "@themes";
import { Summary } from "@views/Entry/Summary";
import { useWebGL } from "@hooks/useWebGL";
import { useWindowSize } from "@hooks/useWindowSize";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 8rem 4rem;

  // background-color: #edeeeb;
  // background-color: #d4d4d4;
  background-color: transparent;
`;

/**
 * https://www.pinterest.ca/pin/516295544798688766/
 */
const SkewedContainer = styled.div`
  height: 100%;
  width: 30rem;
  background-color: #666666;
  // background-color: black;
  display: flex;

  transform: skew(-40deg);

  position: absolute;
  bottom: 0%;
  right: 0;
`;

/**
 * Shadow colors based on types
 * https://www.pinterest.ca/pin/219057969369670935/
 *
 * Stats
 * https://www.pinterest.ca/pin/368661919509274738/
 */

const createTypeShadow = (color, x, y) => `${x} ${y} 3rem -1rem ${color}`;

const ProfileContainer = styled.div`
  height: 35rem;
  width: 35rem;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);

  box-shadow: ${createTypeShadow(colors.types.grass, "10px", "10px")},
    ${createTypeShadow(colors.types.poison, "-10px", "-10px")};
  // box-shadow: ${createTypeShadow(colors.types.grass, "0px", "0px")};
  background-color: transparent;
`;

const ModelView = styled.div`
  height: 100%;
  width: 100%;
`;

const Title = styled.h1`
  // color: ${colors.types.grass};
  color: #404040;
  font-weight: ${fonts.weight.regular};
  letter-spacing: 0.2rem;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const EntryView = () => {
  const webGL = useWebGL();
  const modelView = useRef(null);
  const { width, height } = useWindowSize();

  const updateModel = () => {
    const bbox = modelView.current.getBoundingClientRect();
    // console.debug(modelView.current, bbox);
    webGL.setScissor(bbox.x, bbox.y, bbox.width, bbox.height);
    // webGL.enableScissor();
  };

  useEffect(() => {
    if (!webGL) return;

    // updateModel();
    webGL.loadModel();
  }, [webGL]);

  useEffect(() => {
    if (!webGL || !modelView.current) return;

    updateModel();
  }, [webGL, modelView.current, width, height]);

  return (
    <Container>
      <Title>0001 bulbasaur</Title>
      <Row>
        {/* <ProfileContainer>
          <ModelView ref={modelView} />
        </ProfileContainer> */}
      </Row>
      <Summary
        types={["grass", "poison"]}
        species="Seed Pokemon"
        height="0.7 m (2′04″)"
        weight="6.9 kg (15.2 lbs)"
        abilities={["overgrow", "chlorophyll"]}
      />
    </Container>
  );
};
