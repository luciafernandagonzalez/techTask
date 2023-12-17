import client from "./graphql";
import { gql } from "@apollo/client";
import skill from "../models/skill";
import pokemon from "../models/pokemon";

export const fetchPokemonData = async () => {
  try {
    const response = await client.query({
      query: gql`
        query getPokemonDetails {
          pokemon_v2_pokemon {
            id
            name
            height
            weight
            base_experience
            abilities: pokemon_v2_pokemonabilities_aggregate {
              nodes {
                ability: pokemon_v2_ability {
                  name
                }
              }
            }
          }
        }
      `,
    });

    if (response.data.errors) {
        console.error();
      throw new Error("GraphQL Error:", response.data.errors);
    }

    // const { data } = response.data;
    if (response.data && response.data.pokemon_v2_pokemon) {
      const parsedPokemonDetails = response.data.pokemon_v2_pokemon.map(
        (pokemonData) => {
          const parsedPokemon = new pokemon(
            pokemonData.id,
            pokemonData.name,
            pokemonData.base_experience,
            pokemonData.height,
            pokemonData.weight
          );

          pokemonData.abilities.nodes.forEach((abilityData) => {
            const Skill = new skill(
              abilityData.ability.id,
              abilityData.ability.name
            );
            parsedPokemon.skillList.push(Skill);
          });
          return parsedPokemon;
        }
      );
      return parsedPokemonDetails;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
