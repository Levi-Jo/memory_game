import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import Scoreboard from "../Scoreboard.jsx";

function GameLayout() {
  return (
    <div className="darkened">
      <Navbar />
      <main>
        <Outlet />
        <Scoreboard />
      </main>
    </div>
  );
}

export default GameLayout;
