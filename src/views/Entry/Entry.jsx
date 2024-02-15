import React from "react";
import * as S from "@views/Entry/Entry.styles";
import { ProfileContainer } from "./Entry.styles";

export const EntryView = () => {
  return (
    <S.Container>
      <S.ProfileContainer></S.ProfileContainer>
      <S.SkewedContainer></S.SkewedContainer>
    </S.Container>
  );
};
