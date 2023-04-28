import clsx from 'clsx';
import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import axiosClient from '../../services/axios.js'
import OuthButtons from '../../components/OuthButtons/OuthButtons';
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import  FormLoyout  from '../../loyouts/FormLoyout/FormLayout';
import styles from './Register.module.scss';
export default function Signup() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState({ __html: "" });

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });


    axiosClient
      .post("/signup", {
        name: fullName,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        setCurrentUser(data.user)
        setUserToken(data.token)
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next], [])
          console.log(finalErrors)
          setError({__html: finalErrors.join('<br>')})
        }
        console.error(error)
      });
  };

  return (
    <>
    <FormLoyout>
<form onSubmit={onSubmit} className={styles.form} action="#" method="POST">
        
      <h2 className={styles.title}>Вход</h2>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="i3">
            Имя пользователя
          </label>
                   <input
              id="full-name"
              name="name"
              type="text"
              required
              value={fullName}
              onChange={ev => setFullName(ev.target.value)}
             className={clsx(styles.input)}
              placeholder="Devwise123"
            />
        </div>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="i1">
            Email
          </label>
   <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={ev => setEmail(ev.target.value)}
             className={clsx(styles.input)}
                     placeholder="Example@gmail.com"
            />
        </div>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="i2">
            Пароль
          </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={ev => setPassword(ev.target.value)}
              className={clsx(styles.input)}
                   placeholder="Пароль"
            />
        </div>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="i4">
            Повторите пароль
          </label>
    <input
              id="password-confirmation"
              name="password_confirmation"
              type="password"
              required
              value={passwordConfirmation}
              onChange={ev => setPasswordConfirmation(ev.target.value)}
             className={clsx(styles.input)}
             placeholder="Повторите пароль"
            />
        </div>
           
            <div className={styles.decor}>
        <span style={{background:"transparent"}}>или</span>
      </div>
      
        <OuthButtons/>
        
        <button type="submit"  className={styles.button}>
      Регистрация
    </button>
    
      </form>
      <div className={styles.addition}>
        У вас есть аккаунт?
        <a href="/login" className={styles.blueLink}>
          Войти
        </a>
      </div>
      <div className={styles.addition}>
        При регистрации я даю согласие на обработку своих персональных данных
        <div>
          <a href="/conf" className={styles.blueLink}>
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </FormLoyout>
    </>
  );
}
