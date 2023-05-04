import logo from './logo.svg';
import './App.css';
import styles from './styles.module.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'



function Comment({ username, text, commentid, refresh }) {


    const removeComment = () => {
        console.log(`commentID: ${commentid}`)
        axios.get(`https://192.241.145.155:3001/remove/${commentid}`, {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                }})
            .then(function (response) {
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const adminpriv = () => {
        if (localStorage.getItem("admin") == true || localStorage.getItem("admin") == "true") {
            return (
                <>
                    <button className={styles.remove} onClick={removeComment}>Remove</button>
                </>
            );
        } else {
            return(<></>);
        }
    }

    return (
        <div className={styles.commentwrap}>
            <p className={styles.username}>{username}</p>
            <p className={styles.commenttext}>{text}</p>
            {adminpriv()}

        </div>

    );
}

export default Comment;
