import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import styles from '../App.module.css';
import { ThemeContext } from '../utils/ThemeContext';

const CalculoDeInvestimento: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className={styles.app}>
        <Header />
        <div className={styles.container}>
        </div>
    </div>
  );
};

export default CalculoDeInvestimento;
