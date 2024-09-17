import "./Login.css";
import appFirebase from "../../credentials";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
const auth = getAuth(appFirebase);  

export default function Login() {

    const [registering, setRegistering] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Ingresando...");
    }
    return (
        <main onSubmit={handleSubmit} className="login">
          <h1 className="login__title">Ingresar a mi cuenta</h1>
          <form className="login__form">
            <section className="login__section">
                <div className="login__field">
                    <label className="login__label" htmlFor="email">Email:</label>
                    <input className="login__input login__input--email" type="text" id="email" placeholder="johndoe@correo.com" />
                </div>
                <div className="login__field">
                    <label className="login__label" htmlFor="password">Contraseña:</label>
                    <input className="login__input login__input--password" type="password" id="password" placeholder="••••••••" />
                </div>
            </section>
            <section className="login__section login__section--actions">
                <button className="login__button" type="submit">Ingresar</button>
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