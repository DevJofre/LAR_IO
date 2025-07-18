import React from 'react';
import styles from './TabButton.module.css';

interface TabButtonProps {
  id: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ id, activeTab, setActiveTab, children }) => {
  const isActive = activeTab === id;
  const buttonClasses = `${styles.tabButton} ${isActive ? styles.active : ''}`;

  return (
    <button className={buttonClasses} onClick={() => setActiveTab(id)}>
      {children}
    </button>
  );
};

export default TabButton;