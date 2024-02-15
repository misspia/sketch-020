import styled from "styled-components";
import { colors } from "@themes";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;

  padding: 0 5rem;

  background-color: white;
`;

/**
 * https://www.pinterest.ca/pin/516295544798688766/
 */
export const SkewedContainer = styled.div`
  height: 100%;
  width: 30rem;
  background-color: black;
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
export const ProfileContainer = styled.div`
  height: 35rem;
  width: 35rem;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 0 2rem -0.5rem ${colors.shadow};
`;
