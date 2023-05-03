import logo from './logo.svg';
import './App.css';
import styles from './styles.module.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";
import Navbar from "./Navbar";
import axios from 'axios';
import Game from "./Game";
import { useState, useEffect } from 'react'


function App() {
  // localStorage.setItem("li", false);

  const [games, setGames] = useState([]);


  useEffect(() => {
    axios.get("https://localhost:3001/games", {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(function (response) {
        console.log(response.data)
        setGames(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [])

  const getAllRoutes = (data) => {
    return (
      data.map((mappedObject, key) => {
        return (<Route path={`/${mappedObject.GameName}`} element={<Game game={mappedObject} />} />);
      })

    );
  }

  return (
    <>
      <BrowserRouter>
        <Navbar games={games} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {getAllRoutes(games)}
        </Routes>
      </BrowserRouter>
    </>


  );

}

export default App;
