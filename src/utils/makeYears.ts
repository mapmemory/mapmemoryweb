const currentYear = new Date().getFullYear();

const options = Array.from({ length: currentYear + 401 }, (_, i) => currentYear - i)
  .map(year => (year > 0 ? year.toString() : `${Math.abs(year)} A.C.`));

export default options;