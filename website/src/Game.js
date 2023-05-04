import logo from './logo.svg';
import './App.css';
import styles from './game.module.css';
import { useState, useEffect } from 'react'
import axios from "axios";
import Comment from "./Comment";
import hstyles from './styles.module.css'


// import { useState } from 'react'

function Game({ game }) {
    const [userCommented, setUserCommented] = useState(false);
    const [input, setInput] = useState("");
    const [refresh, setRefresh] = useState("");
    const [comments, setComments] = useState([]);
    

    useEffect(() => {
        console.log("EFFECT CLAUSE TRIGGERED");
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
    const logout = () => {
        console.log("test");
        localStorage.setItem("li", false);
        localStorage.setItem("username", "");
        setRefresh("a");
    }

    const comment = () => {
        console.log(input);
        console.log(`ID: ${localStorage.getItem("id")}`)
        if (input.length > 0) {
            console.log(`GAME ID: ${game.GameID}`)
            axios.post('https://localhost:3001/comment', null, { params: { userid: localStorage.getItem("id"), gameid: game.GameID, commenttext: input } })
                .then(function (response) {
                    console.log("Worked")
                    console.log(response)
                    // setUserCommented(true);
                }).catch(function (error) { // Catch errors, set ErrorCatch so that error box shows.
                    console.log("Error")
                    console.log(error);
                });
        }
    }

    const put_buttons = () => {
        console.log(localStorage.getItem("li"));
        if (localStorage.getItem("li") == "true") {
            return (
                <>
                {console.log("LIST ITEM TRUE")}
                    <textarea className={hstyles.input_text} value={input} onInput={e => setInput(e.target.value)} rows="4" cols="80">
                        At w3schools.com you will learn how to make a website. They offer
                        free tutorials in all web development technologies.
                    </textarea>
                    <div className={hstyles.flexwrap}>
                        {/* <button className={styles.button} onClick={comment}>Comment</button> */}
                        <button className={hstyles.button} onClick={logout}>Logout</button>
                    </div>

                </>
            );
        } else {
            return (
                <>
                                    {console.log("LIST ITEM FALSE")}
                </>
            );
        }
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
                    {put_buttons()}
                    <button className={hstyles.button} onClick={comment}>Comment</button>

                    <h2>Comments</h2>
                    {comments}

                </section>
            </article>
        </>
    );
}

export default Game;
