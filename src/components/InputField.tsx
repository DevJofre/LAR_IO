import React from 'react';
import styles from './InputField.module.css';
import { formatBRL, unformatBRL } from '../utils/currency';

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  warning?: string; // Adicionando a propriedade de aviso
  helpText?: string;
  isCurrency?: boolean;
  isNumeric?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  warning, // Recebendo a propriedade de aviso
  helpText,
  isCurrency = false,
  isNumeric = false,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCurrency) {
      const rawValue = unformatBRL(e.target.value);
      e.target.value = rawValue;
    }
    onChange(e);
  };

  const displayValue = isCurrency ? formatBRL(value) : value;

  return (
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
        type={isNumeric ? 'number' : (isCurrency ? 'tel' : 'text')}
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        value={displayValue}
        onChange={handleChange}
        onKeyPress={(event) => {
          if (isNumeric && !/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'Tab' && event.key !== 'Enter') {
            event.preventDefault();
          }
        }}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
      {warning && <span className={styles.warningMessage}>{warning}</span>} {/* Exibindo o aviso */}
    </div>
  );
};

export default InputField;
