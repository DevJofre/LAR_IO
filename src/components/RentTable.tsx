import React from 'react';
import { formatCurrency } from '../utils/financial';

interface RentTableProps {
    data: any[];
}

const RentTable: React.FC<RentTableProps> = ({ data }) => (
     <div>
        <h3>Projeção de Custos do Aluguel</h3>
        <div>
            <table>
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
