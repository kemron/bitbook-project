import { SortedMap } from "immutable-sorted";
import buildGroups from "./buildGroups";
import { OrderGroup, getOrderPrice } from "data/model";

/**
 * Calculates spread between bids and asks
 * @param orderedBids grouping of bids
 * @param orderedAsks grouping of asks
 */
export const getSpread = (
  orderedBids: OrderGroup[],
  orderedAsks: OrderGroup[]
) => {
  if (orderedAsks.length < 1 || orderedBids.length < 1) {
    return 0;
  }
  const value = Math.abs(
    getOrderPrice(orderedBids[0]) -
      getOrderPrice(orderedAsks[orderedAsks.length - 1])
  );

  return Math.round((value + Number.EPSILON) * 100) / 100;
};

/**
 * Generates a list of groups as asks orders
 * @param orders sorted mapping of orders
 * @param grouping generated grouping key
 * @param filter number of values to return
 */
export const getAskGroups = (
  orders: SortedMap<number, number>,
  grouping: number,
  filter: number
) => {
  const groups = buildGroups(orders, grouping);
  const groupsWithValue = computeGroupsSum(groups).takeLast(filter).toArray();
  return groupsWithValue;
};

/**
 * Generates a list of groups as bid orders
 * @param orders sorted mapping of orders
 * @param grouping generated grouping key
 * @param filter number of values to return
 */
export const getBidGroups = (
  orders: SortedMap<number, number>,
  grouping: number,
  filter: number
) => {
  const groups = buildGroups(orders, grouping);
  const groupsValue = computeGroupsSum(groups, true).take(filter).toArray();
  return groupsValue;
};

/**
 * Returns order groups with values
 * @param orders Sorted mapping of OrderGroups
 * @param areBids true if grouping represents a set of bids or asks
 */
export const computeGroupsSum = (
  orders: SortedMap<number, OrderGroup>,
  areBids: boolean = false
) => {
  if (orders.size === 0) {
    return orders.valueSeq();
  }

  let groups = orders;
  let [lastOrderPrice] = areBids
    ? orders.first<OrderGroup>()
    : orders.last<OrderGroup>();
  let prevSum = 0;
  orders.from(lastOrderPrice, !areBids).forEach(([price, size]) => {
    const sum = size + prevSum;
    const updatedOrder: OrderGroup = [price, size, sum];
    prevSum = sum;
    groups = groups.set(price, updatedOrder);
  });
  return groups.valueSeq();
};
