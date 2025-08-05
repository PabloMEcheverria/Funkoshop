import { useState } from "react";
import supabase from "../../config/supabaseClient";
import "./Register.css";


export default function Register() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleClick = async (e) => {
    e.preventDefault();
    
    if(name === "" || lastName === "" || email === "" || password === "" || confirmPassword === ""){
      alert("Por favor, llena todos los campos");
      return;
    } else if (name.length < 2 || lastName.length < 2) {
      alert("Por favor, ingresa un nombre y apellido válidos");
      return;
    } else if (!email.includes("@") || !email.includes(".")) {
      alert("Por favor, ingresa un correo válido");
      return;
    } else if (password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
      return;
    } else if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email, 
        password, 
        options: { 
          emailRedirectTo: "https://stupendous-platypus-fb2693.netlify.app/home"  //http://localhost:3000/home
        }
      });
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
          <section className="signup__container">
            <form className="signup__form">
              <section className="signup__section">
                <label className="signup__label" htmlFor="name">Nombre:</label>
                <input className="signup__input" type="text" id="name" name="name" placeholder="John" onChange={e => setName(e.target.value.trim())} />
              </section>
              <section className="signup__section">
                <label className="signup__label" htmlFor="lastName">Apellido:</label>
                <input className="signup__input" type="text" id="lastName" name="lastName" placeholder="Doe" onChange={e => setLastName(e.target.value.trim())} />
              </section>
              <section className="signup__section">
                <label className="signup__label" htmlFor="email">Email:</label>
                <input className="signup__input" type="email" id="email" name="email" placeholder="johndoe@correo.com" onChange={e => setEmail(e.target.value.trim())} />
              </section>
              <section className="signup__section">
                <label className="signup__label" htmlFor="password">Contraseña:</label>
                <input className="signup__input" type="password" id="password" name="password" placeholder="•••••••••" onChange={e => setPassword(e.target.value.trim())} />
              </section>
              <section className="signup__section">
                <label className="signup__label" htmlFor="confirmPassword">Repita Contraseña:</label>
                <input className="signup__input" type="password" id="confirmPassword" name="confirmPassword" placeholder="•••••••••" onChange={e => setConfirmPassword(e.target.value.trim())} />
              </section>
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
          </section>
        </main>
    )
}