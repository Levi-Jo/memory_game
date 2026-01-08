import React from "react";
import styles from "../css/PokemonCard.module.css";
import { useState } from "react";
function PokemonCard({
  pokemon,
  history,
  setHistory,
  isFlipped,
  setIsFlipped,
  totalCards,
  setOpenDialog,
}) {
  const [clickable, setClickable] = useState(true);

  return (
    <>
      {isFlipped ? (
        <div className={styles.card + " " + styles.cardFlipped}>
          <img
            src={pokemon.image + "/high.png"}
            alt={pokemon.name}
            className={styles.cardImage}
            onClick={() => {
              if (history.includes(pokemon.id)) {
                setOpenDialog(true);
              } else if (history.length === totalCards - 1) {
                setHistory((Prevhistory) => [pokemon.id, ...Prevhistory]);
                setOpenDialog(true);
              } else {
                setHistory((Prevhistory) => [pokemon.id, ...Prevhistory]);
              }
            }}
          />
          <div className={styles.back}></div>
        </div>
      ) : (
        <div
          className={styles.cardNotFlipped + " " + styles.card}
          onClick={() => {
            if (clickable === false) return;
            setClickable(false);
            setIsFlipped(true);
          }}
        >
          <img
            src={pokemon.image + "/high.png"}
            alt={pokemon.name}
            className={styles.cardImage}
          />
          <div className={styles.back}></div>
        </div>
      )}
    </>
  );
}

export default PokemonCard;
