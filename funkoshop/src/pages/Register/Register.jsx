    import { useState, useEffect } from "react";
    import supabase from "../../config/supabaseClient";
    import "./Register.css";

    export default function Register() {
      const [name, setName] = useState("");
      const [lastName, setLastName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");
      const [session, setSession] = useState(null);

      useEffect(() => {
        localStorage.removeItem("pendingProfile");
        localStorage.removeItem("profileCreated");
      }, []); 

      const handleClick = async (e) => {
        e.preventDefault();
        if (!name || !lastName || !email || !password || !confirmPassword) {
          alert("Por favor, llena todos los campos");
          return;
        }
        if (name.length < 2 || lastName.length < 2) {
          alert("Por favor, ingresa un nombre y apellido válidos");
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert("Por favor, ingresa un correo válido");
          return;
        }
        if (password.length < 8) {
          alert("La contraseña debe tener al menos 8 caracteres");
          return;
        }
        if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden");
          return;
        }

        const { data: dataSignup, error: errorSignup } = await supabase.auth.signUp({
          email, 
          password
        });

        if (errorSignup) {
          console.log("Error al registrar usuario:", errorSignup.message);
          return {success: false, message: errorSignup.message}
        }

        localStorage.setItem("pendingProfile", JSON.stringify({ name, lastName }));

        alert("Registro exitoso. Revisa la casilla de correo de " + email + " para confirmar tu cuenta.");

        return {
          success: true,
          message: "Usuario registrado correctamente",
          data: dataSignup
        }
      };

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
                <button className="signup__button" type="submit" onClick={handleClick}>Registrar</button>
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
      );
    }