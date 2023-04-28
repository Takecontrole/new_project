import React from 'react';

import styles from './outhButtons.module.scss';

export default function OuthButtons () {
  return (
    <div className={styles.container}>
      <img src="/vkontakte.svg" alt="vkontakte" />
      <img src="/mail.svg" alt="mail" />
      <img src="/yandex.svg" alt="yandex" />
      <img src="/google.svg" alt="google" />
      <img src="/apple.svg" alt="apple" />
    </div>
  );
};
