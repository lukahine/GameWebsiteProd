import logo from './logo.svg';
import './App.css';
import styles from './game.module.css';
import { useState, useEffect } from 'react'
import axios from "axios";
import Comment from "./Comment";

// import { useState } from 'react'

function Game({ game }) {
    const [comments, setComments] = useState();
    const [userCommented, setUserCommented] = useState(false);


    useEffect(() => {
        axios.get(`https://localhost:3001/comments/${game.GameID}`, {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                }})
            .then(function (response) {
                console.log(response.data)
                setComments(getAllComments(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    useEffect(() => {
        if (userCommented) {
            axios.get(`https://localhost:3001/comments/${game.GameID}`, {
                headers: {
                  'Access-Control-Allow-Origin': '*',
                }})
                .then(function (response) {
                    console.log(response.data)
                    setComments(getAllComments(response.data));
                })
                .catch(function (error) {
                    console.log(error);
                });
            setUserCommented(false)
        }
    }, [userCommented])

    const getAllComments = (data) => {
        return (
            data.map((mappedObject, dKey) => {
                return (<Comment key={dKey} username={mappedObject.username} text={mappedObject.commentText} />);
            })

        );
    }
    
    return (
        <>
            <article>
                <h1>{game.GameName}</h1>
                <p>{game.GameDescription}</p>
                <br />
                <hr />
                <br />
                <br />

            </article>

            <iframe id={styles.gamescope} src={game.url}></iframe>

            <article>
                <hr />
                <br />
                <section id={styles.comments}>
                    <h2>Comments</h2>
                    {comments}
                </section>
            </article>
        </>
    );
}

export default Game;
