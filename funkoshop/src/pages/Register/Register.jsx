import "./Register.css";

export default function Register() {
    return (
        <main className="signup">
          <h1 className="signup__title">Crea tu cuenta</h1>
          <p className="signup__description">Completa el formulario para ser parte del mundo de los Funkos</p>
          <form className="signup__form">
            <section className="signup__section">
              <label className="signup__label" htmlFor="name">Nombre:</label>
              <input className="signup__input" type="text" id="name" name="name" placeholder="John" />
            </section>
            <section className="signup__section">
              <label className="signup__label" htmlFor="lastName">Apellido:</label>
              <input className="signup__input" type="text" id="lastName" name="lastName" placeholder="Doe" />
            </section>
            <section className="signup__section">
              <label className="signup__label" htmlFor="email">Email:</label>
              <input className="signup__input" type="email" id="email" name="email" placeholder="johndoe@correo.com" />
            </section>
            <section className="signup__section">
              <label className="signup__label" htmlFor="password">Contraseña:</label>
              <input className="signup__input" type="password" id="password" name="password" placeholder="•••••••••" />
            </section>
            <section className="signup__section">
              <label className="signup__label" htmlFor="confirmPassword">Repita Contraseña:</label>
              <input className="signup__input" type="password" id="confirmPassword" name="confirmPassword" placeholder="•••••••••" />
            </section>
            <section className="signup__section signup__section--submit">
              <button className="signup__button">Registrar</button>
              <div className="signup__terms">
                <input className="signup__checkbox" type="checkbox" />
                <p className="signup__terms-text">
                  Acepto <a href="/terms" className="signup__terms-link">Términos y Condiciones</a>
                </p>
              </div>
            </section>
          </form>
        </main>
    )
}