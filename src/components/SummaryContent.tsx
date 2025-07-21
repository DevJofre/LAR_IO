import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { formatCurrency } from '../utils/financial';
import { ChartOptions } from 'chart.js';
import styles from './SummaryContent.module.css';
import { ThemeContext } from '../utils/ThemeContext';

interface SummaryContentProps {
    financingData: any;
    rentData: any;
    inputs: any;
}

const SummaryContent: React.FC<SummaryContentProps> = ({ financingData, rentData, inputs }) => {
    const { theme } = useContext(ThemeContext);

    const tickColor = theme === 'dark' ? '#e0e0e0' : '#333333';
    const gridColor = theme === 'dark' ? '#555555' : '#e5e7eb';

    const chartData = {
        labels: Array.from({ length: parseInt(inputs.prazoAnos) }, (_, i) => `Ano ${i + 1}`),
        datasets: [
            {
                label: 'Custo Total do Financiamento',
                data: financingData.custoAcumulado,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.3,
            },
            {
                label: 'Custo Total do Aluguel',
                data: rentData.custoAcumulado,
                borderColor: '#fc0000ff',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                fill: true,
                tension: 0.3,
            }
        ]
    };

    const chartOptions: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: tickColor,
                }
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.dataset.label}: ${formatCurrency(context.raw)}`
                }
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: (value: any) => formatCurrency(value),
                    color: tickColor,
                },
                grid: { color: gridColor }
            },
            x: {
                ticks: {
                    color: tickColor,
                },
                grid: { display: false }
            }
        }
    };

    return (
        <div className={styles.summaryContainer}>
            <div className={styles.summaryGrid}>
                <div className={styles.summaryCard}>
                    <h3 className={`${styles.cardTitle} ${styles.titleFinancing}`}>Resumo do Financiamento (Price)</h3>
                    <div className={styles.summaryList}>
                        <div className={styles.summaryItem}>
                            <span>Valor da Parcela Mensal:</span>
                            <strong>{formatCurrency(financingData.parcelaMensal)}</strong>
                        </div>
                        <div className={styles.summaryItem}>
                            <span>Total de Juros Pagos:</span>
                            <strong>{formatCurrency(financingData.totalJuros)}</strong>
                        </div>
                        <div className={styles.summaryItem}>
                            <span>Custo Total (Financiado + Juros):</span>
                            <strong>{formatCurrency(financingData.totalPago)}</strong>
                        </div>
                    </div>
                </div>

                <div className={styles.summaryCard}>
                    <h3 className={`${styles.cardTitle} ${styles.titleRent}`}>Resumo do Aluguel</h3>
                    <div className={styles.summaryList}>
                         <div className={styles.summaryItem}>
                            <span>Aluguel no último ano:</span>
                            <strong>{formatCurrency(rentData.aluguelFinal)}</strong>
                        </div>
                        <div className={styles.summaryItem}>
                            <span>Prazo considerado:</span>
                            <strong>{inputs.prazoAnos} anos</strong>
                        </div>
                        <div className={styles.summaryItem}>
                            <span>Custo Total no Período:</span>
                            <strong>{formatCurrency(rentData.totalPago)}</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.chartContainer}>
                <h3 className={styles.chartTitle}>Custo Total Acumulado ao Longo do Tempo</h3>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default SummaryContent;