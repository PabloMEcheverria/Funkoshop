import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import UserContext from '../../context/UserContext';
import './Login.css';

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      console.log(data);
      setToken(data);

      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        console.log('User profile:', profile);
        setUser(profile);
      }

      navigate("/home");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

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
            <a className="login__forgot-password" href="/Funkoshop/recoverpass">Olvidé mi contraseña</a>
        </section>
      </form>
    </main>
)
}

export default Login;