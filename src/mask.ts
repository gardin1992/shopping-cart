export const toDecimal = (num: number) => (Math.round(num * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)