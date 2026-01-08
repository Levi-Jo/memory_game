import React from "react";
import { useState } from "react";
import styles from "../css/Scoreboard.module.css";
function Scoreboard() {
  const [highScores] = useState(JSON.parse(localStorage.getItem("highScores")));
  const [openScore, setOpenScore] = useState(false);

  return (
    highScores.length > 0 &&
    (openScore ? (
      <>
        <div className={styles.tab}>
          <button
            onClick={() => {
              setOpenScore(false);
            }}
          >
            Right Arrow{" "}
          </button>
        </div>
        <div className={styles.scoreboardDiv}>
          <h2 className={styles.highScores}>High Scores</h2>
          <table className={styles.table}>
            <thead>
              <tr className={styles.trHead}>
                <th className={styles.th}>
                  <h2>Player</h2>
                </th>
                <th className={styles.th}>
                  <h2>Score</h2>
                </th>
                <th className={styles.th}>
                  <h2>Level</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              {highScores.map((score, index) => (
                <tr key={index} className={styles.tr}>
                  <td className={styles.td}>
                    <p>{score.player}</p>
                  </td>
                  <td className={styles.td}>
                    <p>{score.score}</p>
                  </td>
                  <td className={styles.td}>
                    <p>{score.level}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ) : (
      <div className={styles.tab}>
        <button
          onClick={() => {
            setOpenScore(true);
          }}
        >
          Left Arrow{" "}
        </button>
      </div>
    ))
  );
}
export default Scoreboard;
