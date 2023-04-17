import logo from './logo.svg';
import './App.css';
import styles from './styles.module.css'
import { Link } from "react-router-dom";
import { useState } from 'react'



function Comment({ username, text }) {

    
    return (
        <div className={styles.commentwrap}>
            <p className={styles.username}>{username}</p>
            <p className={styles.commenttext}>{text}</p>
        </div>

    );
}

export default Comment;
