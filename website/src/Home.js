import logo from './logo.svg';
import './App.css';
import styles from './styles.module.css'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'
import Comment from './Comment';



function Home() {
    const [refresh, setRefresh] = useState("");
    const [input, setInput] = useState("");
    const [comments, setComments] = useState();
    const [userCommented, setUserCommented] = useState(false);




    useEffect(() => {
        axios.get("http://localhost:3001/comments", {
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
            // axios.get("http://192.241.145.155:3001/comments", {
            axios.get("http://localhost:3001/comments", {
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
                return (<Comment key={dKey} username={mappedObject.userName} text={mappedObject.commentText} />);
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
            axios.post('http://localhost:3001/comment', null, { params: { userid: localStorage.getItem("id"), commenttext: input } })
                .then(function (response) {
                    console.log("Worked")
                    console.log(response)
                    setUserCommented(true);
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
                    <h3 style={{ margin: "20px" }}>Username: {localStorage.getItem("username")}</h3>
                    <h3 style={{ margin: "20px" }}>Admin: {((localStorage.getItem("admin") == 1) ? 'true' : 'false')}</h3>
                    <textarea className={styles.input_text} value={input} onInput={e => setInput(e.target.value)} rows="4" cols="80">
                        At w3schools.com you will learn how to make a website. They offer
                        free tutorials in all web development technologies.
                    </textarea>
                    <div className={styles.flexwrap}>
                        <button className={styles.button} onClick={comment}>Comment</button>
                        <button className={styles.button} onClick={logout}>Logout</button>
                    </div>

                </>
            );
        } else {
            return (
                <>
                    <div className={styles.flexwrap}>
                        <Link to="/login" className={styles.buttontext}><button className={styles.button} >Login</button></Link>
                        <Link to="/signup" className={styles.buttontext}><button className={styles.button} >Signup</button></Link>
                    </div>
                </>
            );
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                {put_buttons()}
                {comments}
            </header>
        </div>

    );
}

export default Home;
