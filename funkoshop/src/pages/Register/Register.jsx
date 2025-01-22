import { useState } from "react";
import supabase from "../../config/supabaseClient";
import "./Register.css";


export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({email, password});
      if (error) throw error;

      console.log(data);

      const user = data.user;
      console.log(user);

      const {data: insertData, error: insertError} = await supabase.from("users").insert([
        { 
          id: user.id, 
          email: user.email, 
          role: "user",
          name: name,
          lastname: lastName
        }
      ]);
      if (insertError) throw insertError;
      alert("Verifica tu correo para confirmar la creación de tu cuenta. 👍");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

    return (
        <main className="signup">
          <h1 className="signup__title">Crea tu cuenta</h1>
          <p className="signup__description">Completa el formulario para ser parte del mundo de los Funkos</p>
          <form className="signup__form">
            <section className="signup__section">
              <label className="signup__label" htmlFor="name">Nombre:</label>
              <input className="signup__input" type="text" id="name" name="name" placeholder="John" onChange={e => setName(e.target.value)} />
            </section>
            <section className="signup__section">
              <label className="signup__label" htmlFor="lastName">Apellido:</label>
              <input className="signup__input" type="text" id="lastName" name="lastName" placeholder="Doe" onChange={e => setLastName(e.target.value)} />
            </section>
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
              <button className="signup__button" type="submit" onClick={(e) => handleClick(e)}>Registrar</button>
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