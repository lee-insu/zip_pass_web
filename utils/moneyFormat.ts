const convertToMoneyFormat = (num: number): string => {
  const quotient = Math.floor(num / 100000000);
  const remainder = num % 100000000;

  let result = "";

  if (quotient > 0) {
    result += `${quotient}억 `;
  }

  const tenThousandRemainder = Math.floor(remainder / 10000);

  if (tenThousandRemainder > 0) {
    result += `${tenThousandRemainder}만 `;
  }

  return result.trim();
};

export default convertToMoneyFormat;
