import styles from "../css/HomePage.module.css";
import { Link } from "react-router-dom";
export function HomePage() {
  return (
    <>
      <h2>Gotta remember'em all!</h2>
      <h3>Choose your difficulty to start:</h3>
      <ul>
        <Link to="/easy">
          <button className={styles.button}>Easy</button>
        </Link>
        <Link to="/medium">
          <button className={styles.button}>Medium</button>
        </Link>
        <Link to="/hard">
          <button className={styles.button}>Hard</button>
        </Link>
      </ul>
    </>
  );
}

export default HomePage;
