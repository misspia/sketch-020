import React from "react";
import styled from "styled-components";
import { usePokemonData } from "@data/usePokemonData";

export const Container = styled.div``;

export const ListView = () => {
  const { listPokemon } = usePokemonData();
  const list = listPokemon();

  return (
    <Container>
      {list.map((pokemon) => (
        <div key={pokemon.id}>{pokemon.identifier}</div>
      ))}
    </Container>
  );
};
