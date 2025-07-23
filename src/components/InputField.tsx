import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  helpText?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  id, 
  label, 
  type = 'text', 
  error,
  helpText,
  ...props 
}) => (
  <div className={styles.fieldContainer}>
    <div className={styles.labelContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {helpText && (
        <div className={styles.helpContainer}>
          <span className={styles.helpIcon}>?</span>
          <div className={styles.tooltip}>{helpText}</div>
        </div>
      )}
    </div>
    <input 
      id={id} 
      name={id} 
      type={type}
      className={`${styles.input} ${error ? styles.inputError : ''}`}
      {...props}
    />
    {error && <span className={styles.errorMessage}>{error}</span>}
  </div>
);

export default InputField;
