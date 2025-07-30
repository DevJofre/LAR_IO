import React from 'react';
import InputField from './InputField';
import styles from './InputSection.module.css';

interface InputSectionProps {
  inputs: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCompare: () => void;
  errorEntrada: string;
  warningSubsidio: string;
}

const InputSection: React.FC<InputSectionProps> = ({ inputs, handleInputChange, handleCompare, errorEntrada, warningSubsidio }) => (
  <div className={styles.container}>
    <div className={styles.grid}>
      <div className={styles.column}>
        <h2 className={`${styles.title} ${styles.titleFinancing}`}>Dados do Financiamento</h2>
        <InputField id="valorImovel" label="Valor do Imóvel (R$)" value={inputs.valorImovel} onChange={handleInputChange} placeholder="300000" isCurrency={true} />
        <InputField id="valorEntrada" label="Valor da Entrada (R$)" value={inputs.valorEntrada} onChange={handleInputChange} placeholder="100000" error={errorEntrada} helpText="Exigir uma entrada de, no mínimo, 20% do valor do imóvel é uma prática padrão na maioria dos financiamentos bancários." isCurrency={true} />
        <InputField id="valorSubsidio" label="Subsídio (R$)" value={inputs.valorSubsidio} onChange={handleInputChange} placeholder="55000" warning={warningSubsidio} helpText="O valor do subsídio não é o mesmo para todos. Ele depende principalmente da sua renda familiar mensal, que determina em qual faixa do programa Minha Casa, Minha Vida(2025), você se encaixa.(valor max: 55 mil)" isCurrency={true} />
        <InputField id="jurosAnual" label="Taxa de Juros Anual (%)" value={inputs.jurosAnual} onChange={handleInputChange} placeholder="7" helpText="A taxa de juros do Minha Casa, Minha Vida também está diretamente ligada à faixa de renda da família. Assim como no subsídio, a lógica é a mesma: o governo oferece um benefício maior para quem tem menor renda. (4% ate 12%, dependendo da faixa ou banco que ira financiar.) " isNumeric={true} />
        <InputField id="prazoAnos" label="Prazo (anos)" value={inputs.prazoAnos} onChange={handleInputChange} placeholder="35" isNumeric={true} />
        <InputField id="itbi" label="ITBI (%)" value={inputs.itbi} onChange={handleInputChange} placeholder="3" helpText="O Imposto sobre a Transmissão de Bens Imóveis (ITBI) é um tributo municipal pago na compra de um imóvel. A alíquota varia de cidade para cidade, mas geralmente fica entre 2% e 3% do valor do imóvel." isNumeric={true} />
      </div>

      <div className={styles.column}>
        <h2 className={`${styles.title} ${styles.titleRent}`}>Dados do Aluguel</h2>
        <InputField id="aluguelInicial" label="Aluguel Inicial (R$)" value={inputs.aluguelInicial} onChange={handleInputChange} placeholder="1500" isCurrency={true} />
        <InputField id="reajusteAnual" label="Reajuste Anual (%)" value={inputs.reajusteAnual} onChange={handleInputChange} placeholder="6" helpText="Percentual de aumento anual do aluguel.Pode varia de região para região." isNumeric={true} />
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