export const currencyFormat = (value) => {
  return value.toLocaleString("it-IT", {
    style: "currency",
    currency: "VND",
  });
};

export function parseQueryString(queryString) {
  const pairs = queryString.substring(1).split("&");
  return pairs.reduce((params, pair) => {
    const [key, value] = pair.split("=");
    params[key] = decodeURIComponent(value);
    return params;
  }, {});
}
