import React from 'react';
import styles from './ToggleSwitch.module.css';

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
  return (
    // Adicione um container aqui
    <div> 
      <input
        checked={isOn}
        onChange={handleToggle}
        className={styles.reactSwitchCheckbox}
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        className={styles.reactSwitchLabel}
        htmlFor={`react-switch-new`}
      >
        <span className={styles.reactSwitchButton} />
      </label>
    </div> // Feche o container
  );
};

export default ToggleSwitch;