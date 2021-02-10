import SortableMap, { SortedMap } from "utils/SortableMap";
import { getOrderSize, getOrderPrice } from "data/model";

type OrderGroup = [number, number, number];
/**
 *
 * @param order Determines how entries should be grouped together
 * @param grouping
 */
export const selectGroupingKey = (
  order: [number, number],
  grouping: number
) => {
  const price = getOrderPrice(order);
  if (grouping > price || grouping < 1) {
    return price;
  }
  const factor = Math.floor(price / grouping);
  const groupKey = grouping * factor;
  return groupKey;
};

/**
 * Rolls orders into groups based on common key
 * @param orders [price,sum] tuple of orders
 * @param grouping generated grouping key
 */
const buildGroups = (orders: SortedMap<number, number>, grouping: number) => {
  let groups = SortableMap<OrderGroup>([]);
  groups = groups.withMutations((mGroupMap) => {
    orders.toArray().map(function (order, index) {
      const groupKey = selectGroupingKey(order, grouping);
      const [, count] = mGroupMap.get(groupKey, [groupKey, 0, 0]);
      const newCount = count + getOrderSize(order);
      mGroupMap.set(groupKey, [groupKey, newCount, 0]);
    });
  });
  return groups;
};

export default buildGroups;
