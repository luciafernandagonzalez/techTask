import React, { useEffect, useState } from "react";
import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import PokemonCard from "./PokemonCard";
import { fetchPokemonData } from "../services/pokemonService";

function PokemonDetails() {
  const [pokemonDetails, setPokemonDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(6);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPokemonData();
        if (data && Array.isArray(data)) {
          setPokemonDetails(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = pokemonDetails.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <h1>Lista de Pokemon</h1>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {currentPokemon.map((pokemon, index) => (
              <IonCol size="12" size-md="4" key={index}>
                <PokemonCard pokemon={pokemon}></PokemonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonCol size="4" offset="9">
          <IonButton onClick={prevPage} disabled={currentPage === 1}>
            Anterior
          </IonButton>
          <IonButton
            onClick={nextPage}
            disabled={indexOfLastPokemon >= pokemonDetails.length}
          >
            Siguiente
          </IonButton>
        </IonCol>
      </IonContent>
    </IonPage>
  );
}

export default PokemonDetails;
