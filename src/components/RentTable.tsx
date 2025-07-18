import React from 'react';
import { formatCurrency } from '../utils/financial';
import styles from './Table.module.css'; // Importa o mesmo CSS reutilizável

interface RentTableProps {
    data: any[];
}

const RentTable: React.FC<RentTableProps> = ({ data }) => (
    <div className={styles.tableContainer}>
        <h3 className={`${styles.tableTitle} ${styles.titleGreen}`}>
            Projeção de Custos do Aluguel
        </h3>
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Ano</th>
                        <th>Valor Mensal do Aluguel</th>
                        <th>Custo Anual</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(p => (
                        <tr key={p.ano}>
                            <td>{p.ano}</td>
                            <td>{formatCurrency(p.valorMensal)}</td>
                            <td>{formatCurrency(p.custoAnual)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default RentTable;