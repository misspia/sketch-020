import React, { useEffect } from "react";
import styled from "styled-components";
import { usePokemonData } from "@hooks/usePokemonData";
import { useWebGL } from "@hooks/useWebGL";

export const Container = styled.div``;

export const ListView = () => {
  const { allPokemon } = usePokemonData();
  const webGL = useWebGL();

  useEffect(() => {
    webGL.enterListStage(allPokemon);
  }, []);

  return (
    <Container>
      {allPokemon.map((pokemon) => (
        <div key={pokemon.id}>{pokemon.name}</div>
      ))}
    </Container>
  );
};
