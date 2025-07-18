import React, { useContext } from 'react';
import styles from './Header.module.css'; 
import { ThemeContext } from '../utils/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.mainTitle}>Comparador Financeiro</h1>
      <p className={styles.subtitle}>Financiamento de Imóvel vs. Aluguel</p>
      <button onClick={toggleTheme} className={styles.themeToggle}>
        {theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
      </button>
    </header>
  );
};

export default Header;