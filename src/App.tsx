import React, { useState } from 'react';
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

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler
);

interface ResultsState {
    financingData: any;
    rentData: any;
}

export default function App() {
    const [inputs, setInputs] = useState({
        valorImovel: '300000',
        valorEntrada: '100000',
        valorSubsidio: '55000',
        jurosAnual: '7',
        prazoAnos: '35',
        aluguelInicial: '1500',
        reajusteAnual: '6',
    });
    const [results, setResults] = useState<ResultsState | null>(null);
    const [activeTab, setActiveTab] = useState('summary');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleCompare = () => {
        const numericInputs = Object.fromEntries(
            Object.entries(inputs).map(([key, value]) => [key, parseFloat(value) || 0])
        );
        const financingData = calculatePriceFinancing(numericInputs);
        const rentData = calculateRent(numericInputs);

        if (financingData.error || rentData.error) {
            alert(financingData.error || rentData.error);
            return;
        }

        setResults({ financingData, rentData });
        setActiveTab('summary');
    };

    return (
        <div className={styles.app}>
            <div className={styles.container}>
                <Header />
                <InputSection inputs={inputs} handleInputChange={handleInputChange} handleCompare={handleCompare} />
                
                {results && (
                    <div className={styles.resultsSection}>
                        <nav className={styles.tabsNav}>
                            <TabButton id="summary" activeTab={activeTab} setActiveTab={setActiveTab}>Resumo Comparativo</TabButton>
                            <TabButton id="financing" activeTab={activeTab} setActiveTab={setActiveTab}>Detalhes do Financiamento</TabButton>
                            <TabButton id="rent" activeTab={activeTab} setActiveTab={setActiveTab}>Detalhes do Aluguel</TabButton>
                        </nav>
                        
                        <div className={styles.tabContent}>
                            {activeTab === 'summary' && <SummaryContent financingData={results.financingData} rentData={results.rentData} inputs={inputs} />}
                            {activeTab === 'financing' && <FinancingTable data={results.financingData.parcelas} />}
                            {activeTab === 'rent' && <RentTable data={results.rentData.pagamentos} />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}