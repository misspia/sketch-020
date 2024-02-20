import React, { useEffect, useMemo, useRef } from "react";
import { useWindowSize } from "@hooks/useWindowSize";
import { useApp } from "@hooks/useApp";
import { useWebGL } from "@hooks/useWebGL";
import { AppStage } from "@constants/app";

import { LoadingView } from "@views/Loading";
import { StartView } from "@views/Start";
import { ListView } from "@views/List";
import { EntryView } from "@views/Entry";

export const App = () => {
  const { width, height } = useWindowSize();
  const webGL = useWebGL();
  const { stage } = useApp();

  useEffect(() => {
    if (!webGL) return;

    webGL.resize(width, height);
  }, [webGL, width, height]);

  useEffect(() => {
    if (!webGL) return;

    webGL.draw();
  }, [webGL]);

  // should return loading
  if (!webGL) return null;

  return (
    <>
      {stage === AppStage.LOADING && <LoadingView />}
      {stage === AppStage.START && <StartView />}
      {stage === AppStage.LIST && <ListView />}
      {stage === AppStage.ENTRY && <EntryView />}
    </>
  );
};
