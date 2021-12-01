import React, { useContext } from 'react';
import { authContext } from '../../contexts/AuthContext';
import './Login.css';
import Logo from '../../assets/imgs/spotify-logo.png';

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogIn,
    handleSignUp,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = useContext(authContext);

  return (
    <section className="login">
      <div className="login-container">
        <div className="login-header">
          <img src={Logo} alt="Spotify logo" className="login-logo" />
          <p className="login-title">Чтобы продолжить, войдите в аккаунт.</p>
        </div>
        <input
          type="text"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Электронная почта"
          required
          autoFocus
        />
        <p className="errorMsg">{emailError}</p>
        <input
          type="password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          required
          autoFocus
        />
        <p className="errorMsg">{passwordError}</p>
        <div className="login-btn-container">
          {hasAccount ? (
            <>
              <button className="login-btn" onClick={handleLogIn}>
                ВОЙТИ
              </button>
              <p className="authP">
                Еще нет аккаунта?{' '}
                <span
                  className="authSpan"
                  onClick={() => setHasAccount(!hasAccount)}>
                  ЗАРЕГИСТРИРУЙСЯ
                </span>
              </p>
            </>
          ) : (
            <>
              <button className="login-btn" onClick={handleSignUp}>
                ЗАРЕГИСТРИРОВАТЬСЯ
              </button>
              <p className="authP">
                Есть аккаунт?{' '}
                <span
                  className="authSpan"
                  onClick={() => {
                    setHasAccount(!hasAccount);
                  }}>
                  ВОЙТИ
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
