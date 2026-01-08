import Layout from "./components/Layouts/Layout.jsx";
import GameLayout from "./components/Layouts/GameLayout.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./components/HomePage.jsx";
import Snap from "./components/Snap.jsx";
import Game from "./components/Game.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="*" element={<HomePage />} />
          <Route path="/snap" element={<Snap />} />
        </Route>
        <Route element={<GameLayout />}>
          <Route path="/easy" element={<Game level="Easy" />} />
          <Route path="/medium" element={<Game level="Medium" />} />
          <Route path="/hard" element={<Game level="Hard" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
