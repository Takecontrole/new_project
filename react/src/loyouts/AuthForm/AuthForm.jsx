import React, { ReactNode } from 'react';
import OuthButtons from '../../components/OuthButtons/OuthButtons';

import styles from './AuthForm.module.scss';



export default function Authform({
  formName,
  buttonName,
  children,
  
})  {
  return (
    <form className={styles.form}>
      <h2 className={styles.title}>{formName}</h2>
     
      <div className={styles.decor}>
        <span>или</span>
      </div>
    
     
<OuthButtons/>
      
    </form>
  );
};
