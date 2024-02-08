import React, { useEffect, useMemo, useRef } from "react";
import { WebGLApp } from "./webgl";
import { useWindowSize } from "./hooks";

export const App = () => {
  const canvasRef = useRef(null);

  const webglApp = useMemo(() => {
    if (!canvasRef.current) return;
    return new WebGLApp(canvasRef.current);
  }, [canvasRef.current]);
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (!webglApp) return;

    webglApp.resize(width, height);
  }, [webglApp, width, height]);

  useEffect(() => {
    if (!webglApp) return;

    webglApp.draw();

    webglApp.loadModel();
  }, [webglApp]);

  return <canvas ref={canvasRef}></canvas>;
};
