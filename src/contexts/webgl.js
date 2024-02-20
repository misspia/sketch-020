import { useRef, useMemo, createContext } from "react";
import styled from "styled-components";
import { WebGLApp } from "@webgl";
import { useWindowSize } from "@hooks/useWindowSize";

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const WebGLContext = createContext(null);

export const WebGLProvider = ({ children }) => {
  // why does removing this line cause the webgl app to not render?
  const { width, height } = useWindowSize();

  const canvasRef = useRef(null);
  const webGL = useMemo(() => {
    if (!canvasRef.current) return;
    return new WebGLApp(canvasRef.current);
  }, [canvasRef.current]);

  return (
    <WebGLContext.Provider value={webGL}>
      <Canvas ref={canvasRef}></Canvas>
      {children}
    </WebGLContext.Provider>
  );
};
