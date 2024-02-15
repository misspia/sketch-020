import React, { useState } from "react";
import gsap from "gsap";
import * as S from "@views/Loading/Loading.styles";

export const LoadingView = () => {
  const [progress, setProgress] = useState(30);
  return (
    <S.Container>
      <S.Circle>
        <S.ProgressText>{progress}%</S.ProgressText>
      </S.Circle>
    </S.Container>
  );
};
