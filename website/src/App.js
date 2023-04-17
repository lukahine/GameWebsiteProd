import logo from './logo.svg';
import './App.css';
import styles from './styles.module.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";


function App() {
  // localStorage.setItem("li", false);
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
