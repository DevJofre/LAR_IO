import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  id, 
  label, 
  type = 'text', 
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
      className={styles.input}
      {...props}
    />
  </div>
);

export default InputField;