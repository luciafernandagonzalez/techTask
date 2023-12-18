import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
} from "@ionic/react";
import React from "react";

const PokemonCard = ({ pokemon }) => {
  return (
    <IonCard color="light">
      <IonCardHeader>
        <IonCardTitle>
          <strong>Nombre: {pokemon.name}</strong>
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          {"Experiencia: "}
          {pokemon.experience}
        </IonItem>
        <IonItem>
          {"Altura: "}
          {pokemon.height}
        </IonItem>
        <IonItem>
          {"Peso: "}
          {pokemon.weight}
        </IonItem>
        <IonItem>
          {"Habilidades: "}
          {pokemon.skillList.map((skill, i) => (
            <span key={i}>
              &nbsp;
              {skill.name}
              {i !== pokemon.skillList.length - 1 ? ", " : ""}
            </span>
          ))}
        </IonItem>
      </IonCardContent>
    </IonCard>
  );
};

export default PokemonCard;
