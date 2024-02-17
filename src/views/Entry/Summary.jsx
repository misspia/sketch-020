import React from "react";
import styled from "styled-components";

import { TypeTag } from "@views/Entry/TypeTag";

const Container = styled.div`
  position: absolute;
  bottom: 10%;
  right: 5%;

  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  position: relative;
  padding: 1rem 2rem;
  background-color: #404040;
  color: #fff;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.2rem;

  &::before {
    z-index: -1;
    content: "";
    position: absolute;
    top: 0;
    left: 75%;
    transform: skewX(40deg);
    background-color: inherit;

    height: 100%;
    width: 4rem;
  }
`;

const Table = styled.table`
  color: #404040;
  padding: 1rem;
  border-radius: 3px;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-bottom: 1px solid #404040;

  &:last-child {
    border-bottom: none;
  }
`;

const TableLabel = styled.td`
  display: flex;
  align-items: center;
  font-weight: bold;
  padding-right: 3.5rem;
  text-align: left;
  text-transform: lowercase;
`;

const TableValue = styled.td`
  text-align: left;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
`;

export const Summary = ({
  types = [],
  species = "",
  height = "",
  weight = "",
  abilities = [],
}) => {
  return (
    <Container>
      <Title>Summary</Title>
      <Table>
        <TableBody>
          <TableRow>
            <TableLabel>types</TableLabel>
            <TableValue>
              {types.map((type, index) => (
                <TypeTag key={index} type={type} />
              ))}
            </TableValue>
          </TableRow>

          <TableRow>
            <TableLabel>species</TableLabel>
            <TableValue>{species}</TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>height</TableLabel>
            <TableValue>{height}</TableValue>
          </TableRow>
          <TableRow>
            <TableLabel>weight</TableLabel>
            <TableValue>{weight}</TableValue>
          </TableRow>

          <TableRow>
            <TableLabel>abilities</TableLabel>
            <TableValue>{abilities.join(", ")}</TableValue>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};
