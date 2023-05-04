import logo from './logo.svg';
import './App.css';
import styles from './navbar.module.css';
import { Link } from 'react-router-dom';
import hstyles from './styles.module.css'
import { useState, useEffect } from 'react'


// import { useState } from 'react'

function Navbar({games, refresh, setRefresh}) {


    console.log(`Navbar: ${games}`)

    const getAllLinks = (data) => {
        return (
            data.map((mappedObject, key) => {
                return (<li className={styles.right}><Link to={`/${mappedObject.GameName}`} className={styles.right_internal}>{mappedObject.GameName}</Link></li>);
            })

        );
    }

    const logout = () => {
        console.log("test");
        localStorage.setItem("li", false);
        localStorage.setItem("username", "");
        setRefresh("a");
    }

    const put_buttons = () => {
        console.log("PUTTING BUTTONS");
        if (localStorage.getItem("li") == "true") {
            console.log("TRUE")
            return (
                <li className={styles.right_logout} onClick={logout}>Logout</li>
            );
        } else {
            console.log("FALSE")
            return (
                <>
                    <li className={styles.right}><Link to="/login#" className={styles.right_internal}>Login</Link></li>
                    <li className={styles.right}><Link to="/signup" className={styles.right_internal}>Signup</Link></li>
                </>
            );
        }
    }

    return (
        <nav>
            <ul id={styles.nav_content}>
                <li className={styles.left}>octonode</li>
                {put_buttons()}
                {getAllLinks(games)}
                <li className={styles.right}><Link to="/#" className={styles.right_internal}>Home</Link></li>


            </ul>
        </nav>
    );
}

export default Navbar;
