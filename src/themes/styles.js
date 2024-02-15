import { createGlobalStyle } from "styled-components";
import { font } from "@themes";

export const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${font.fontFamily};
    font-weight: ${font.weight.regular};
    font-optical-sizing: auto;
    font-style: normal;

    margin: 0;
  }
`;

export default {};
