export type CryptoItem = {
  image: string;
  name: string;
  percentageIn1h: number;
  percentageIn24h: number;
  percentageIn7d: number;
  price: number;
  sparklineData: Array<number>;
  symbol: string;
};
