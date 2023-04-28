import clsx from 'clsx';
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../services/axios";
import OuthButtons from '../../components/OuthButtons/OuthButtons';
import { useStateContext } from "../../contexts/ContextProvider";
import  AuthForm  from '../../loyouts/AuthForm/AuthForm';
import  FormLoyout  from '../../loyouts/FormLoyout/FormLayout';
import styles from './Auth.module.scss';
export default function Login() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          setError({ __html: finalErrors.join("<br>") });
        }
        console.error(error);
      });
  };

  
  return (
    <>
      <FormLoyout>
     
      <form onSubmit={onSubmit} className={styles.form} action="#" method="POST">
        
      <h2 className={styles.title}>Вход</h2>

     <div className={styles.container}>
          <label className={styles.label} htmlFor="i1">
            Email
          </label>
     <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          placeholder="Example@gmail.com"
          id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
          className={clsx(styles.input)}
          
        />
 
      </div>

    </div>
        </div>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="i2">
            Пароль
          </label> 
        <div className={styles.container}>
      <div className={styles.inputContainer}>
                      <input 
               placeholder="Введите пароль"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(ev) => setPassword(ev.target.value)} 
              className={clsx(styles.input)}
       />

             </div>
           </div>
        </div>

    
      
            <div className={styles.decor}>
        <span style={{background:"transparent"}}>или</span>
      </div>
    
     
<OuthButtons/>
        <button type="submit"  className={styles.button}>
      Войти
    </button>
    </form>
          <div className={styles.addition}>
        Забыли пароль?
        <a href="/auth" className={styles.blueLink}>
          Восстановление
        </a>
      </div>
      <div className={styles.addition}>
        Нет аккаунта?
        <a href="/register" className={styles.blueLink}>
          Регистрация
        </a>
      </div>
          </FormLoyout>
    </>
  );
}
