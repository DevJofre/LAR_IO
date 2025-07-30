
import { formatBRL } from './currency';

export const formatCurrency = (value: number) => formatBRL(value);


export const calculatePriceFinancing = (inputs: any) => {
    const valorFinanciado = inputs.valorImovel - inputs.valorEntrada - inputs.valorSubsidio;
    if (valorFinanciado <= 0) return { error: "O valor a ser financiado deve ser positivo." };

    const itbiValue = inputs.valorImovel * (inputs.itbi / 100);
    const taxaJurosMensal = Math.pow(1 + inputs.jurosAnual / 100, 1.0 / 12.0) - 1;
    const prazoMeses = inputs.prazoAnos * 12;

    if (prazoMeses <= 0) return { error: "O prazo deve ser positivo." };

    const pmt = valorFinanciado * (taxaJurosMensal * Math.pow(1 + taxaJurosMensal, prazoMeses)) / (Math.pow(1 + taxaJurosMensal, prazoMeses) - 1);

    let parcelas = [];
    let saldoDevedor = valorFinanciado;
    let totalJuros = 0;
    let custoAcumulado = [];

    for (let i = 1; i <= prazoMeses; i++) {
        const juros = saldoDevedor * taxaJurosMensal;
        const amortizacao = pmt - juros;
        saldoDevedor -= amortizacao;
        totalJuros += juros;

        parcelas.push({
            numero: i,
            valorParcela: pmt,
            juros,
            amortizacao,
            saldoDevedor: saldoDevedor > 0 ? saldoDevedor : 0
        });
        
        if (i % 12 === 0) {
            custoAcumulado.push(valorFinanciado + totalJuros + itbiValue);
        }
    }

    return {
        parcelas,
        totalJuros,
        totalPago: valorFinanciado + totalJuros + itbiValue,
        parcelaMensal: pmt,
        custoAcumulado,
        itbi: itbiValue
    };
};

export const calculateRent = (inputs: any) => {
    const prazoMeses = inputs.prazoAnos * 12;
    if (prazoMeses <= 0) return { error: "O prazo deve ser positivo." };

    let pagamentos = [];
    let totalPago = 0;
    let valorAluguelAtual = inputs.aluguelInicial;
    const reajuste = inputs.reajusteAnual / 100;
    let aluguelFinal = valorAluguelAtual;
    let custoAcumulado = [];
    let custoAnualAcumulado = 0;

    for (let mes = 1; mes <= prazoMeses; mes++) {
        totalPago += valorAluguelAtual;
        custoAnualAcumulado += valorAluguelAtual;

        if (mes % 12 === 0) {
            pagamentos.push({
                ano: mes / 12,
                valorMensal: valorAluguelAtual,
                custoAnual: custoAnualAcumulado
            });
            aluguelFinal = valorAluguelAtual;
            valorAluguelAtual *= (1 + reajuste);
            custoAcumulado.push(totalPago);
            custoAnualAcumulado = 0;
        }
    }

    return { pagamentos, totalPago, aluguelFinal, custoAcumulado };
};
