import React, { useState, useContext, useEffect } from 'react';
import Header from '../components/Header';
import styles from '../App.module.css';
import investmentStyles from './CalculoDeInvestimento.module.css'; // Importa os novos estilos
import { ThemeContext } from '../utils/ThemeContext';
import InputField from '../components/InputField';

const CalculoDeInvestimento: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const [investmentInputs, setInvestmentInputs] = useState({
    investimentoInicial: '',
    aporteMensal: '',
    periodoAnos: '',
    selicEfetiva: '',
    cdi: '',
    ipca: '',
    tr: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvestmentInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    console.log(investmentInputs);
    // A lógica de cálculo será adicionada aqui no futuro
  };

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.container}>
        <h2 style={{ color: 'var(--text-color)', textAlign: 'center', marginTop: '2rem' }}>
          Simulador de Investimento
        </h2>
        <div className={investmentStyles.formContainer}>
          <div className={investmentStyles.inputsRow}>
            <InputField
              id="investimentoInicial"
              label="Investimento Inicial"
              value={investmentInputs.investimentoInicial}
              onChange={handleInputChange}
              isCurrency
              placeholder="R$ 0,00"
            />
            <InputField
              id="aporteMensal"
              label="Aporte Mensal"
              value={investmentInputs.aporteMensal}
              onChange={handleInputChange}
              isCurrency
              placeholder="R$ 0,00"
            />
            <InputField
              id="periodoAnos"
              label="Período de Aplicação (anos)"
              value={investmentInputs.periodoAnos}
              onChange={handleInputChange}
              isNumeric
              placeholder="0"
            />
          </div>

          <hr className={investmentStyles.separator} />

          <div className={investmentStyles.inputsRow}>
            <InputField
              id="selicEfetiva"
              label="Selic Efetiva (% a.a.)"
              value={investmentInputs.selicEfetiva}
              onChange={handleInputChange}
              isNumeric
              placeholder="0.00"
            />
            <InputField
              id="cdi"
              label="CDI (% a.a.)"
              value={investmentInputs.cdi}
              onChange={handleInputChange}
              isNumeric
              placeholder="0.00"
            />
            <InputField
              id="ipca"
              label="IPCA (% a.a.)"
              value={investmentInputs.ipca}
              onChange={handleInputChange}
              isNumeric
              placeholder="0.00"
            />
            <InputField
              id="tr"
              label="TR (% a.a.)"
              value={investmentInputs.tr}
              onChange={handleInputChange}
              isNumeric
              placeholder="0.00"
            />
          </div>

          <div className={investmentStyles.buttonContainer}>
            <button className={investmentStyles.calculateButton} onClick={handleCalculate}>
              Calcular
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculoDeInvestimento;
