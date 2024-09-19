import "./Login.css";
import appFirebase from "../../credentials";
import { auth } from "../../credentials";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = e => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential;
            console.log(user);
            navigate("/home");
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        })
    }
    
    return (
        <main className="login">
          <h1 className="login__title">Ingresar a mi cuenta</h1>
          <form className="login__form">
            <section className="login__section">
                <div className="login__field">
                    <label className="login__label" htmlFor="email">Email:</label>
                    <input className="login__input login__input--email" type="email" id="email" placeholder="johndoe@correo.com" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="login__field">
                    <label className="login__label" htmlFor="password">Contraseña:</label>
                    <input className="login__input login__input--password" type="password" id="password" placeholder="•••••••••" onChange={e => setPassword(e.target.value)} />
                </div>
            </section>
            <section className="login__section login__section--actions">
                <button className="login__button" type="submit" onClick={onLogin}>Ingresar</button>
                <div className="login__remember-me-container">
                  <input className="login__checkbox" type="checkbox" id="rememberMe" name="rememberMe" value={true} />
                  <label className="login__checkbox-label" htmlFor="rememberMe">Recordarme</label>
                </div>
                <a className="login__forgot-password" href="/recoverpass">Olvidé mi contraseña</a>
            </section>
          </form>
        </main>
    )
}