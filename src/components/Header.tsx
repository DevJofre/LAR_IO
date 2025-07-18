import React from 'react';
import styles from './Header.module.css'; 

const Header = () => (
  <header className={styles.headerContainer}>
    <h1 className={styles.mainTitle}>Comparador Financeiro</h1>
    <p className={styles.subtitle}>Financiamento de Imóvel vs. Aluguel</p>
  </header>
);

export default Header;