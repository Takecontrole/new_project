import React, { ReactNode } from 'react';

import styles from './FormLoyout.module.scss';


export default function FormLoyout({ children })  {
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
      <div className={styles.formContainer}>{children}</div>
    </div>
  );
};
