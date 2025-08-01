import React, { useContext } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../utils/ThemeContext'; // Importe o contexto
import ToggleSwitch from './ToggleSwitch'; // Importe o componente do switch

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext); // Use o contexto

  return (
    <header className={styles.headerContainer}>
      <div className={styles.logo}>
        <img src="/logo.svg" alt="Lar IO Logo" style={{ height: '30px', marginRight: '10px' }} />
        <span className={styles.logoText}>Lar IO</span>
      </div>
      <nav className={styles.navLinks}>
        <Link to="/" className={styles.navLink}>INICIO</Link>
        <Link to="/calculo-de-investimento" className={styles.navLink}>INVESTIMENTO</Link>
        <Link to="/suport" className={styles.navLink}>SUPORT</Link>
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