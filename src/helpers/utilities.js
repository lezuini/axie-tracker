export const toSmallNumber = (string, decimalSize = 2) => {
  return Number(string).toFixed(decimalSize);
};
