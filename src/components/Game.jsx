import styles from "../css/Game.module.css";
import PokemonCard from "./PokemonCard";
import { useState, useEffect } from "react";
function Game({ level }) {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  let totalCards;
  switch (level) {
    case "Easy":
      totalCards = 6;
      break;
    case "Medium":
      totalCards = 18;
      break;
    case "Hard":
      totalCards = 30;
      break;
    default:
      totalCards = 6;
      break;
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);

    const fetchPokemon = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const res = await fetch("/api", {
          headers: { "X-Api-Key": apiKey },
          signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!data || !Array.isArray(data)) throw new Error("No data");

        const cards = [];
        for (let i = 0; i < totalCards; i++) {
          const idx = Math.floor(Math.random() * data.length);
          const item = data[idx];
          if (item && item.image) cards.push(item);
          else i--;
        }

        if (!signal.aborted) {
          setPokemonCards(cards);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
          return;
        }
        console.error("Error fetching Pokemon data:", err);
      } finally {
        if (!signal.aborted) {
          switch (level) {
            case "Easy":
              setTimeout(() => setLoading(false), 1000);
              break;
            case "Medium":
              setTimeout(() => setLoading(false), 1500);
              break;
            case "Hard":
              setTimeout(() => setLoading(false), 3000);
              break;
            default:
              setTimeout(() => setLoading(false), 4000);
          }
        }
      }
    };

    fetchPokemon();
    return () => controller.abort();
  }, [totalCards, level]);
  useEffect(() => {
    if (pokemonCards.length > 0) {
      setIsFlipped(false);
      setTimeout(() => {
        const shuffledCards = [...pokemonCards].sort(() => Math.random() - 0.5);
        setPokemonCards(shuffledCards);
        setIsFlipped(true);
      }, 1000);
    }
  }, [history]);

  function saveScore(formData) {
    const player = formData.get("player");
    let scores;
    if (localStorage.getItem("highScores") === null) {
      scores = [];
    } else {
      scores = JSON.parse(localStorage.getItem("highScores"));
    }
    const scoreObj = {
      player: player,
      score: history.length,
      level: level,
    };
    scores.push(scoreObj);
    localStorage.setItem("highScores", JSON.stringify(scores));

    parent.location = "home";
  }

  return (
    <>
      {!openDialog ? (
        <div>
          <img
            src="../src/assets/pokeball.png"
            alt="Loading..."
            className="Loading"
            style={{ display: loading ? "block" : "none" }}
          />
          <div
            className={styles.gameContainer}
            style={{ display: loading ? "none" : "block" }}
          >
            <div className={styles.gameInfo}>
              <p>Level: {level}</p>
              <p>Total Cards: {totalCards}</p>
            </div>
            <p>Score: {history.length}</p>
            <div className={styles.cardGrid}>
              {pokemonCards.length > 0 &&
                pokemonCards.map((pokemon, index) => (
                  <PokemonCard
                    history={history}
                    setHistory={setHistory}
                    key={index}
                    pokemon={pokemon}
                    isFlipped={isFlipped}
                    setIsFlipped={setIsFlipped}
                    totalCards={totalCards}
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.endDiv}>
          <h2>Woah that was Okay, I guess...</h2>
          <p>
            You got {history.length} out of {totalCards}
          </p>
          <p>Enter your name below to be written down in LOCAL STORAGE!!</p>

          <form action={saveScore}>
            <label>
              Name:{" "}
              <input
                type="text"
                name="player"
                placeholder="Ash Ketchum"
              ></input>
            </label>
            <button type="submit">Submit!</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Game;
