import logo from './logo.svg';
import './App.css';
import styles from './styles.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login({refresh, setRefresh}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    const submitForm = (e) => {
        axios.post('https://localhost:3001/login', null, { params: { username: username, password: password } })
            .then(function (response) {
                console.log("Worked")
                console.log(response)
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("admin", response.data.admin);
                localStorage.setItem("id", response.data.userid);
                localStorage.setItem("li", true);
                setRefresh("b");
                routeChange()
            }).catch(function (error) { // Catch errors, set ErrorCatch so that error box shows.
                console.log("Error")
                console.log(error);
            });
    }


    return (
        <div className="App">
            <header className="App-header">
                <h1 className={styles.form_header}>LOGIN</h1>
                <input className={styles.input_form} type="text" placeholder="Username" value={username} onInput={e => setUsername(e.target.value)}></input>
                <input className={styles.input_form} type="password" placeholder="Password" value={password} onInput={e => setPassword(e.target.value)}></input>

                <button className={styles.button} onClick={submitForm}>Login</button>


            </header>
        </div>
    );
}

export default Login;
