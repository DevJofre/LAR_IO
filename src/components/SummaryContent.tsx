import React from 'react';
import { Line } from 'react-chartjs-2';
import { formatCurrency } from '../utils/financial';
import { ChartOptions } from 'chart.js';

interface SummaryContentProps {
    financingData: any;
    rentData: any;
    inputs: any;
}

const SummaryContent: React.FC<SummaryContentProps> = ({ financingData, rentData, inputs }) => {
    const chartData = {
        labels: Array.from({ length: inputs.prazoAnos }, (_, i) => `Ano ${i + 1}`),
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
                borderColor: '#16a34a',
                backgroundColor: 'rgba(22, 163, 74, 0.1)',
                fill: true,
                tension: 0.3,
            }
        ]
    };

    const chartOptions: ChartOptions<"line"> = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: {
                callbacks: {
                    label: (context: any) => `${context.dataset.label}: ${formatCurrency(context.raw)}`
                }
            }
        },
        scales: {
            y: { ticks: { callback: (value: any) => formatCurrency(value) } }
        }
    };

    return (
        <div>
            <div>
                <div>
                    <h3>Resumo do Financiamento (Price)</h3>
                    <div>
                        <p><span>Valor da Parcela Mensal:</span> <strong>{formatCurrency(financingData.parcelaMensal)}</strong></p>
                        <p><span>Total de Juros Pagos:</span> <strong>{formatCurrency(financingData.totalJuros)}</strong></p>
                        <p><span>Custo Total:</span> <strong>{formatCurrency(financingData.totalPago)}</strong></p>
                    </div>
                </div>
                <div>
                    <h3>Resumo do Aluguel</h3>
                    <div>
                        <p><span>Aluguel no último ano:</span> <strong>{formatCurrency(rentData.aluguelFinal)}</strong></p>
                        <p><span>Prazo considerado:</span> <strong>{inputs.prazoAnos} anos</strong></p>
                        <p><span>Custo Total no Período:</span> <strong>{formatCurrency(rentData.totalPago)}</strong></p>
                    </div>
                </div>
            </div>
            <div>
                <h3>Custo Total Acumulado ao Longo do Tempo</h3>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default SummaryContent;
