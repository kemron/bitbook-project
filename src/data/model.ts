export type Order = [number, number];
export type OrderGroup = [number, number, number];

export type Payload = {
  product_id: string;
  feed: string;
  asks: Order[];
  bids: Order[];
  numLevels?: number;
};

export const getOrderPrice = (order: Order | OrderGroup): number => order[0];
export const getOrderSize = (order: Order | OrderGroup): number => order[1];
export const getOrderSum = (order: OrderGroup): number => order[2];

export const isOrderEmpty = (entry: Order | OrderGroup) =>
  getOrderSize(entry) === 0;
