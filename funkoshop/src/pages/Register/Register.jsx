import "./Register.css";
import { auth, firestore } from "../../credentials";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc} from "firebase/firestore";

export default function Register() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit2(e) {
    e.preventDefault();
    console.log("onSubmit2 fue llamada");
    try {
      const userInfo = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userInfo.user.uid;
      console.log("Usuario creado con UID:", userId);
      console.log(firestore);
      const docRef = doc(firestore, `users/${userId}`);
      console.log(docRef);
      await setDoc(docRef, { email: email, rol: "user" });
      console.log(userInfo);
      navigate("/home");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  }
  

  const onSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
    return (
        <main className="signup">
          <h1 className="signup__title">Crea tu cuenta</h1>
          <p className="signup__description">Completa el formulario para ser parte del mundo de los Funkos</p>
          <form className="signup__form">
            {/*<section className="signup__section">
              <label className="signup__label" htmlFor="name">Nombre:</label>
              <input className="signup__input" type="text" id="name" name="name" placeholder="John" />
            </section>
            <section className="signup__section">
              <label className="signup__label" htmlFor="lastName">Apellido:</label>
              <input className="signup__input" type="text" id="lastName" name="lastName" placeholder="Doe" />
            </section>*/}
            <section className="signup__section">
              <label className="signup__label" htmlFor="email">Email:</label>
              <input className="signup__input" type="email" id="email" name="email" placeholder="johndoe@correo.com" onChange={e => setEmail(e.target.value)} />
            </section>
            <section className="signup__section">
              <label className="signup__label" htmlFor="password">Contraseña:</label>
              <input className="signup__input" type="password" id="password" name="password" placeholder="•••••••••" onChange={e => setPassword(e.target.value)} />
            </section>
            {/*<section className="signup__section">
              <label className="signup__label" htmlFor="confirmPassword">Repita Contraseña:</label>
              <input className="signup__input" type="password" id="confirmPassword" name="confirmPassword" placeholder="•••••••••" />
            </section>*/}
            <section className="signup__section signup__section--submit">
              <button className="signup__button" type="submit" onClick={(e) => onSubmit2(e)}>Registrar</button>
              <div className="signup__terms">
                <input className="signup__checkbox" type="checkbox" />
                <p className="signup__terms-text">
                  Acepto <a href="/Funkoshop/terms" className="signup__terms-link">Términos y Condiciones</a>
                </p>
              </div>
            </section>
          </form>
        </main>
    )
}