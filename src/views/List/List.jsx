import React, { useEffect } from "react";
import styled from "styled-components";
import { usePokemonData } from "@hooks/usePokemonData";

export const Container = styled.div``;

export const ListView = () => {
  const { allPokemon } = usePokemonData();

  useEffect(() => {
    console.log("list", allPokemon);
  }, []);

  return (
    <Container>
      {allPokemon.map((pokemon) => (
        <div key={pokemon.id}>{pokemon.name}</div>
      ))}
    </Container>
  );
};
