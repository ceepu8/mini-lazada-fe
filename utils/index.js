export function currencyFormat(number) {
  // Convert number to string and split into whole number and decimals
  let [wholeNum, decimals] = String(number).split(".");

  // Add thousands separator to whole number using regex
  wholeNum = wholeNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // If there are any decimals, concatenate them with the formatted whole number
  if (decimals) {
    return `đ${wholeNum},${decimals}`;
  } else {
    return `đ${wholeNum}`;
  }
}

export function parseQueryString(queryString) {
  const pairs = queryString.substring(1).split("&");
  return pairs.reduce((params, pair) => {
    const [key, value] = pair.split("=");
    params[key] = decodeURIComponent(value);
    return params;
  }, {});
}

export function formatDate(date) {
  var d = new Date(date);
  var hours = d.getUTCHours().toString().padStart(2, "0");
  var minutes = d.getUTCMinutes().toString().padStart(2, "0");
  var seconds = d.getUTCSeconds().toString().padStart(2, "0");
  var day = d.getUTCDate().toString().padStart(2, "0");
  var month = (d.getUTCMonth() + 1).toString().padStart(2, "0");
  var year = d.getUTCFullYear().toString();
  return `${hours}:${minutes}:${seconds}, ${day}-${month}-${year}`;
}

export function filterUndefinedProperties(obj) {
  const filtered = {};
  for (let prop in obj) {
    if (obj[prop] !== undefined) {
      filtered[prop] = obj[prop];
    }
  }
  return filtered;
}
