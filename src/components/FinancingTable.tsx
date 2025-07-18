import React from 'react';
import { formatCurrency } from '../utils/financial';
import styles from './Table.module.css'; // Importa o CSS reutilizável

interface FinancingTableProps {
    data: any[];
}

const FinancingTable: React.FC<FinancingTableProps> = ({ data }) => (
    <div className={styles.tableContainer}>
        <h3 className={`${styles.tableTitle} ${styles.titleBlue}`}>
            Tabela de Amortização
        </h3>
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Mês</th>
                        <th>Parcela</th>
                        <th>Juros</th>
                        <th>Amortização</th>
                        <th>Saldo Devedor</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(p => (
                        <tr key={p.numero}>
                            <td>{p.numero}</td>
                            <td>{formatCurrency(p.valorParcela)}</td>
                            <td className={styles.textRed}>{formatCurrency(p.juros)}</td>
                            <td className={styles.textGreen}>{formatCurrency(p.amortizacao)}</td>
                            <td>{formatCurrency(p.saldoDevedor)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default FinancingTable;