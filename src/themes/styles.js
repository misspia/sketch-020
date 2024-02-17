import { createGlobalStyle } from "styled-components";
import { fonts } from "@themes";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${fonts.fontFamily};
    font-weight: ${fonts.weight.regular};
    font-optical-sizing: auto;
    font-style: normal;

    margin: 0;
  }
`;

export default {};
