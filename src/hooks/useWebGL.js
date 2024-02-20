import { useContext } from "react";
import { WebGLContext } from "@contexts/webgl";

export const useWebGL = () => {
  const webglApp = useContext(WebGLContext);

  return webglApp;
};
