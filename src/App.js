import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Entry from "./Entry";
import { getCookie } from "./functions/cookie";
import GamePlay from "./GamePlay";
import Login from "./Login";
import Game_ from "./pages/Game_";
import Register from "./Register";

function App() {
  let isuserLoggedIn = getCookie("isLoggedIn");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={isuserLoggedIn ? <Game_ /> : <Entry />}
        />
        <Route exact path="login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/home" element={<Game_ />} />
        <Route exact path="/gameplay/:id" element={<GamePlay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
