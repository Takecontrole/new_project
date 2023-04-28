import React from 'react';
import { Input } from '../../components/Input';
import { emailRegex, passwordRegex } from '../../entities/reqex';
import { API } from '../../services/api';
import { AuthForm } from '../AuthForm';

import styles from './AuthPage.module.scss';

type AuthPageProps = {};

export const AuthPage: React.FC<AuthPageProps> = (props) => {
  const [emailText, setEmailText] = React.useState('');
  const [passwordText, setPasswordText] = React.useState('');
  const [emailErrorState, setEmailErrorState] = React.useState(false);
  const [passwordErrorState, setPasswordErrorState] = React.useState(false);

  const sendRequest = (e: any) => {
    e.preventDefault();
    if (emailRegex.test(emailText)) {
      setEmailErrorState(false);
      if (passwordRegex.test(passwordText)) {
        setPasswordErrorState(false);
        API.auth({ email: emailText, password: passwordText });
      } else {
        setPasswordErrorState(true);
      }
    } else {
      setEmailErrorState(true);
    }
  };
  return (
    <div className={styles.wideContainer}>
      <div className={styles.leftSide}>
        <img src="/logo.svg" alt="logo" />
        <p>
          The <span>whole</span> beauty industry in one place
        </p>
        <div className={styles.decor}>
          <img src="/auth_decor.svg" alt="decor" />
        </div>
      </div>
      <div className={styles.formContainer}>
        <AuthForm sendRequest={sendRequest} formName="Вход" buttonName="Войти">
          <div className={styles.container}>
            <label className={styles.label} htmlFor="i1">
              Email
            </label>
            <Input
              type={'email'}
              placeholder={'Example@gmail.com'}
              error={emailErrorState}
              id={'i1'}
              errorMessage={'Неверная почта'}
              value={emailText}
              changeSetData={(text) => setEmailText(text)}
            />
          </div>
          <div className={styles.container}>
            <label className={styles.label} htmlFor="i2">
              Пароль
            </label>
            <Input
              type={'password'}
              error={passwordErrorState}
              placeholder={'Введите пароль'}
              id={'i2'}
              errorMessage={'Неверный пароль'}
              value={passwordText}
              changeSetData={(text) => setPasswordText(text)}
            />
          </div>
        </AuthForm>
        <div className={styles.addition}>
          Забыли пароль?
          <a href="/somePage" className={styles.blueLink}>
            Восстановление
          </a>
        </div>
        <div className={styles.addition}>
          Нет аккаунта?
          <a href="/register" className={styles.blueLink}>
            Регистрация
          </a>
        </div>
      </div>
    </div>
  );
};
