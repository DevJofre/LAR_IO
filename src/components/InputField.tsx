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
}

const InputField: React.FC<InputFieldProps> = ({ 
  id, 
  label, 
  type = 'text', 
  error,
  ...props 
}) => (
  <div className={styles.fieldContainer}>
    <label htmlFor={id} className={styles.label}>
      {label}
    </label>
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