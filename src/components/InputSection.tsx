import React from 'react';
import InputField from './InputField';
import styles from './InputSection.module.css';

interface InputSectionProps {
  inputs: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCompare: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, handleInputChange, handleCompare }) => (
  <div className={styles.container}>
    <div className={styles.grid}>
      <div className={styles.column}>
        <h2 className={`${styles.title} ${styles.titleFinancing}`}>Dados do Financiamento</h2>
        <InputField id="valorImovel" label="Valor do Imóvel (R$)" value={inputs.valorImovel} onChange={handleInputChange} placeholder="300000" />
        <InputField id="valorEntrada" label="Valor da Entrada (R$)" value={inputs.valorEntrada} onChange={handleInputChange} placeholder="100000" />
        <InputField id="valorSubsidio" label="Subsídio (R$)" value={inputs.valorSubsidio} onChange={handleInputChange} placeholder="55000" />
        <InputField id="jurosAnual" label="Taxa de Juros Anual (%)" value={inputs.jurosAnual} onChange={handleInputChange} placeholder="7" />
        <InputField id="prazoAnos" label="Prazo (anos)" value={inputs.prazoAnos} onChange={handleInputChange} placeholder="35" />
      </div>

      <div className={styles.column}>
        <h2 className={`${styles.title} ${styles.titleRent}`}>Dados do Aluguel</h2>
        <InputField id="aluguelInicial" label="Aluguel Inicial (R$)" value={inputs.aluguelInicial} onChange={handleInputChange} placeholder="1500" />
        <InputField id="reajusteAnual" label="Reajuste Anual (%)" value={inputs.reajusteAnual} onChange={handleInputChange} placeholder="6" />
      </div>
    </div>

    <div className={styles.buttonContainer}>
      <button onClick={handleCompare} className={styles.compareButton}>
        Comparar Cenários
      </button>
    </div>
  </div>
);

export default InputSection;