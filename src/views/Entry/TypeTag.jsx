import React from "react";
import styled from "styled-components";
import { colors } from "@themes";

const Container = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 2px;

  color: #fff;
  background-color: ${(props) =>
    colors.types[props.type] ?? colors.types.normal};
`;

export const TypeTag = ({ type }) => {
  return <Container type={type}>{type}</Container>;
};
