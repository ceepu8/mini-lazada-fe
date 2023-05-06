export const currencyFormat = (value) => {
  return value.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};
