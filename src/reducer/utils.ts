import { SortedMap } from "immutable-sorted";
import { Order, isOrderEmpty, getOrderPrice, getOrderSize } from "data/model";

export const processOrders = (
  currentLevels: SortedMap<number, number>,
  newOrders: Order[]
) => {
  return currentLevels.withMutations((orderMap) => {
    newOrders.forEach((order) => {
      const price = getOrderPrice(order);
      if (isOrderEmpty(order)) {
        orderMap.delete(price);
      } else {
        orderMap.set(price, getOrderSize(order));
      }
    });
  });
};
