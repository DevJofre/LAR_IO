import React, { useContext } from 'react';
import styles from './Header.module.css'; 
import { ThemeContext } from '../utils/ThemeContext';
import ToggleSwitch from './ToggleSwitch';
import { Link } from 'react-router-dom';

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.mainTitle}>Comparador Financeiro</h1>
      <p className={styles.subtitle}>Financiamento de Imóvel vs. Aluguel</p>
      <nav>
        <Link to="/calculo-de-investimento" className={styles.navButton}>Cálculo de Investimento</Link>
      </nav>
      <div className={styles.themeToggleContainer}>
        <span>☀️</span>
          <div className={styles.switchWrapper}> 
            <ToggleSwitch isOn={theme === 'dark'} handleToggle={toggleTheme} />
          </div>
        <span>🌙</span>
      </div>
    </header>
  );
};

export default Header;