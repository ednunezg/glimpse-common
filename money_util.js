const formatCentsToUSD = (centsUSD) => {
  let isNeg = (centsUSD < 0)
  return `${isNeg ? "-" : ""}$${Math.abs((centsUSD/100)).toFixed(2)}`
}

export default {
  formatCentsToUSD: formatCentsToUSD
};