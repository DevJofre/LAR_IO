export const formatBRL = (value: string | number): string => {
    const numberValue = typeof value === 'number' ? value : parseFloat(value.replace(/\D/g, '')) / 100;

    if (isNaN(numberValue)) {
        return '';
    }

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(numberValue);
};

export const unformatBRL = (value: string): string => {
    return value.replace(/\D/g, '');
};
