const exchangeArea = (area: number) => {
  const exchange = area / 3.3058;

  return Math.round(exchange);
};

export default exchangeArea;
