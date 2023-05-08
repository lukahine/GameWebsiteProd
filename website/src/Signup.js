import logo from './logo.svg';
import './App.css';
import styles from './styles/styles.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import validator from 'validator'



function Signup() {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const [fieldFail, setFieldFail] = useState({ email: "", uname: "", pword: "", confPword: "" });


    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/login`;
        navigate(path);
    }

    const submitForm = (e) => {
        var fieldCheck = { email: "", uname: "", pword: "", confPword: "" };

        if (!email || !validator.isEmail(email)) {
            fieldCheck.email = <div className={styles.errormessage}>Email is invalid.</div>;
        }
        if (!username || !validator.isAlphanumeric(username) || username.length < 3) {
            fieldCheck.uname = <div className={styles.errormessage}>Username is invalid.</div>;
        }
        // Password must be 8+ characters and contain: upper,lower,digit,symbol
        if (!password || !validator.isStrongPassword(password)) {
            fieldCheck.pword = <div className={styles.errormessage}>Password is invalid. It must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol. </div>;
        }
        if (!confirmPassword || confirmPassword !== password) {
            fieldCheck.confPword = <div className={styles.errormessage}>Passwords must be the same</div>;
        }
        if (!fieldCheck.email && !fieldCheck.uname && !fieldCheck.pword && !fieldCheck.confPword) {
            axios.post('https://localhost:3001/signup', null, { params: { email: email, username: username, password: password, admin: admin } })
                .then(function (response) {
                    console.log("Worked")
                    console.log(response)
                    routeChange()
                }).catch(function (error) { // Catch errors, set ErrorCatch so that error box shows.
                    console.log("Error")
                    console.log(error);
                });
        } else {
            setFieldFail(fieldCheck);
        }
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1 className={styles.form_header}>SIGN UP</h1>
                <input className={styles.input_form} type="text" placeholder="Email" value={email} onInput={e => setEmail(e.target.value)}></input>
                {fieldFail.email}
                <input className={styles.input_form} type="text" placeholder="Username" value={username} onInput={e => setUsername(e.target.value)}></input>
                {fieldFail.uname}
                <input className={styles.input_form} type="password" placeholder="Password" value={password} onInput={e => setPassword(e.target.value)}></input>
                {fieldFail.pword}
                <input className={styles.input_form} type="password" placeholder="Confirm Password" value={confirmPassword} onInput={e => setConfirmPassword(e.target.value)}></input>
                {fieldFail.confPword}
                <label for="admin">Admin</label>
                <input type="checkbox" id="admin" name="admin" style={{margin: "8px"}} onClick={e => setAdmin(e.target.checked)}></input>


                <button className={styles.button} onClick={submitForm}>Signup</button>
            </header>
        </div>
    );
}

export default Signup;
