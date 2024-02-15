import React, { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { WebGLApp } from "@webgl";
import { useWindowSize } from "@hooks/useWindowSize";
import { useApp } from "@hooks/useApp";
import { AppStage } from "@constants/app";
import { GlobalStyles } from "@themes";

import { LoadingView } from "@views/Loading";
import { StartView } from "@views/Start";
import { ListView } from "@views/List";
import { EntryView } from "@views/Entry";

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const App = () => {
  const canvasRef = useRef(null);
  const { stage } = useApp();

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

  return (
    <>
      <GlobalStyles />
      <Canvas ref={canvasRef}></Canvas>
      {stage === AppStage.LOADING && <LoadingView />}
      {stage === AppStage.START && <StartView />}
      {stage === AppStage.LIST && <ListView />}
      {stage === AppStage.ENTRY && <EntryView />}
    </>
  );
};
