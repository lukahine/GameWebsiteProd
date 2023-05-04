import logo from './logo.svg';
import './App.css';
import styles from './styles.module.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import Comment from './Comment';



function Home() {
    

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {/* {put_buttons()} */}
                {/* {comments} */}
            </header>
        </div>

    );
}

export default Home;
