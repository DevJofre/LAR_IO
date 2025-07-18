import React from 'react';
import { formatCurrency } from '../utils/financial';

interface FinancingTableProps {
    data: any[];
}

const FinancingTable: React.FC<FinancingTableProps> = ({ data }) => (
    <div>
        <h3>Tabela de Amortização (Price)</h3>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Mês</th>
                        <th>Parcela</th>
                        <th>Juros</th>
                        <th>Amortização</th>
                        <th>Saldo Devedor</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map(p => (
                        <tr key={p.numero}>
                            <td>{p.numero}</td>
                            <td>{formatCurrency(p.valorParcela)}</td>
                            <td>{formatCurrency(p.juros)}</td>
                            <td>{formatCurrency(p.amortizacao)}</td>
                            <td>{formatCurrency(p.saldoDevedor)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default FinancingTable;
