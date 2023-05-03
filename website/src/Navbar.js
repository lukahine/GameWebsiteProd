import logo from './logo.svg';
import './App.css';
import styles from './navbar.module.css';
import { Link } from 'react-router-dom';

// import { useState } from 'react'

function Navbar({games}) {
   



    console.log(`Navbar: ${games}`)

    const getAllLinks = (data) => {
        return (
            data.map((mappedObject, key) => {
                return (<li className={styles.right}><Link to={`/${mappedObject.GameName}`} className={styles.right_internal}>{mappedObject.GameName}</Link></li>);
            })

        );
    }
    return (
        <nav>
            <ul id={styles.nav_content}>
                <li className={styles.left}>octonode</li>
                <li className={styles.right}><Link to="/#" className={styles.right_internal}>Home</Link></li>
                <li className={styles.right}><Link to="/login#" className={styles.right_internal}>Login</Link></li>
                <li className={styles.right}><Link to="/signup" className={styles.right_internal}>Signup</Link></li>
                {getAllLinks(games)}

            </ul>
        </nav>
    );
}

export default Navbar;
