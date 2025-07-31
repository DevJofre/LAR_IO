import React, { useState, useContext, useEffect } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import SummaryContent from './components/SummaryContent';
import FinancingTable from './components/FinancingTable';
import RentTable from './components/RentTable';
import TabButton from './components/TabButton';
import { calculatePriceFinancing, calculateRent } from './utils/financial';
import styles from './App.module.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { ThemeProvider, ThemeContext } from './utils/ThemeContext';
import { Routes, Route } from 'react-router-dom';
import CalculoDeInvestimento from './pages/CalculoDeInvestimento';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

interface ResultsState {
    financingData: any;
    rentData: any;
    prazoAnos: number;
}

function AppContent() {
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const [inputs, setInputs] = useState(() => {
        return {
            valorImovel: '30000000',
            valorEntrada: '6000000',
            valorSubsidio: '5500000',
            jurosAnual: '7',
            prazoAnos: '35',
            itbi: '3',
            aluguelInicial: '150000',
            reajusteAnual: '6',
        };
    });
    const [results, setResults] = useState<ResultsState | null>(null);
    const [activeTab, setActiveTab] = useState('summary');
    const [errorEntrada, setErrorEntrada] = useState('');
    const [warningSubsidio, setWarningSubsidio] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setErrorEntrada('');
        setWarningSubsidio('');

        if (name === 'valorImovel') {
            const valorImovel = parseFloat(value) || 0;
            const valorEntrada = valorImovel * 0.20;
            setInputs(prev => ({
                ...prev,
                [name]: value,
                valorEntrada: Math.round(valorEntrada).toString(),
            }));
        } else {
            setInputs(prev => ({ ...prev, [name]: value }));
        }

        if (name === 'valorSubsidio') {
            const valorSubsidio = parseFloat(value.replace(/\D/g, '')) || 0;
            if (valorSubsidio > 5500000) {
                setWarningSubsidio('O subsídio do governo geralmente não excede R$ 55.000. Valores maiores podem não ser realistas.');
            }
        }
    };

    const handleCompare = () => {
        const currencyKeys = ['valorImovel', 'valorEntrada', 'valorSubsidio', 'aluguelInicial'];
        const numericInputs = Object.fromEntries(
            Object.entries(inputs).map(([key, value]) => {
                const parsedValue = parseFloat(value) || 0;
                if (currencyKeys.includes(key)) {
                    return [key, parsedValue / 100];
                }
                return [key, parsedValue];
            })
        );

        const { valorImovel, valorEntrada } = numericInputs;
        const minEntrada = valorImovel * 0.20;

        if (valorEntrada > valorImovel) {
            setErrorEntrada('O valor da entrada não pode ser maior que o valor do imóvel.');
            return;
        }

        if (valorEntrada < minEntrada) {
            setErrorEntrada(`O valor da entrada deve ser de no mínimo 20% do valor do imóvel (R$ ${minEntrada.toFixed(2)}).`);
            return;
        }

        setErrorEntrada('');
        const financingData = calculatePriceFinancing(numericInputs);
        const rentData = calculateRent(numericInputs);

        if (financingData.error || rentData.error) {
            alert(financingData.error || rentData.error);
            return;
        }

        setResults({ financingData, rentData, prazoAnos: numericInputs.prazoAnos });
        setActiveTab('summary');
    };

    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <Header />

                <InputSection inputs={inputs} handleInputChange={handleInputChange} handleCompare={handleCompare} errorEntrada={errorEntrada} warningSubsidio={warningSubsidio} />
                
                {results && (
                    <div className={styles.resultsSection}>
                        <nav className={styles.tabsNav}>
                            <TabButton id="summary" activeTab={activeTab} setActiveTab={setActiveTab}>Resumo Comparativo</TabButton>
                            <TabButton id="financing" activeTab={activeTab} setActiveTab={setActiveTab}>Detalhes do Financiamento</TabButton>
                            <TabButton id="rent" activeTab={activeTab} setActiveTab={setActiveTab}>Detalhes do Aluguel</TabButton>
                        </nav>
                        
                        <div className={styles.tabContent}>
                            {activeTab === 'summary' && <SummaryContent financingData={results.financingData} rentData={results.rentData} prazoAnos={results.prazoAnos} />}
                            {activeTab === 'financing' && <FinancingTable data={results.financingData.parcelas} />}
                            {activeTab === 'rent' && <RentTable data={results.rentData.pagamentos} />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <Routes>
                <Route path="/" element={<AppContent />} />
                <Route path="/calculo-de-investimento" element={<CalculoDeInvestimento />} />
            </Routes>
        </ThemeProvider>
    );
}