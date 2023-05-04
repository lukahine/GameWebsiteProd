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
            {/* <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

            </header> */}

            <article className={styles.show}>
                <h1 className={styles.header1}>About Us</h1>
                <p className={styles.text}>Welcome to our website, your one-stop-shop for all things gaming! We are dedicated to bringing you the best and
                    most exciting games on the market. Whether you're a hardcore gamer or just looking for a fun way to pass the
                    time, we've got something for everyone. From action-packed shooters to brain-teasing puzzles, our extensive
                    library of games has something to suit all tastes and skill levels. Our team of passionate gamers is constantly
                    updating our selection to ensure that you have access to the latest and greatest games around. So come on in,
                    browse our selection, and let the gaming begin!</p>
                <h2 className={styles.header2}>Our Mission</h2>
                <p className={styles.text}>Our mission is to create a safe and enjoyable gaming environment for everyone. We believe that gaming is a
                    form of entertainment that brings people together, and we want to make it as easy and fun as possible for
                    gamers to connect and play together.</p>
                <h2 className={styles.header2}>Our Team</h2>
                <ul className={styles.default}>
                    <li className={styles.text}>Erik Bjorklund</li>
                    <li className={styles.text}>Cooper Ott</li>
                    <li className={styles.text}>Luke Hine</li>
                </ul>
                <h2 className={styles.header2}>Contact Us</h2>
                <p className={styles.text}>If you have any questions or feedback, please don't hesitate to contact us:</p>
                <ul className={styles.default} style={{marginBottom: "64px"}}>
                    <li className={styles.text}>Email: info@gamehostingwebsite.com</li>
                    <li className={styles.text}>Phone: 555-1234</li>
                    <li className={styles.text}>Address: 123 Main Street, Anytown USA</li>
                </ul>
            </article>
        </div>

    );
}

export default Home;
