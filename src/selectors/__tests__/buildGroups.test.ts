import { Order } from "../../reducer";
import SortableMap from "utils/SortableMap";
import buildGroups, { selectGroupingKey } from "selectors/buildGroups";

describe("selectGroupingKey", () => {
  it("Should group order prices that are within the margin of the grouping value", () => {
    const orders: Order[] = [
      [8, 55],
      [17.55, 78],
      [20.347, 15],
      [25, 30],
    ];
    const expected = [5, 15, 20, 25];
    const grouping = 5;
    const results = orders.map((order) => selectGroupingKey(order, grouping));
    expect(results).toEqual(expected);
  });

  it("Should return the identity of the order prices when grouping value is 1", () => {
    const data: Order[] = [
      [8, 55],
      [32, 78],
      [64, 15],
      [93, 30],
    ];
    const expected = [8, 32, 64, 93];
    const grouping = 1;
    const results = data.map((order) => selectGroupingKey(order, grouping));
    expect(results).toEqual(expected);
  });

  it("Should return identity when grouping exceeds number", () => {
    const data: Order[] = [
      [8, 55],
      [32, 78],
      [64, 15],
      [93, 30],
    ];
    const expected = [8, 32, 64, 70];
    const grouping = 70;
    const results = data.map((order) => selectGroupingKey(order, grouping));
    expect(results).toEqual(expected);
  });

  it("Should return identity when grouping exceeds is <=0", () => {
    const data: Order[] = [
      [8, 55],
      [32, 78],
      [64, 15],
      [93, 30],
    ];
    const expected = [8, 32, 64, 93];
    const grouping = -5;
    const results = data.map((order) => selectGroupingKey(order, grouping));
    expect(results).toEqual(expected);
  });
});

// -----------------------------------------------------------------------------------------------

describe("selectGroups", () => {
  it("should return a sorted array of orders grouped according to grouping key", () => {
    const entries = [
      [74.55, 78],
      [32, 66],
      [34.5, 88],
      [87.77, 55],
    ] as Iterable<number>;
    const orders = SortableMap<[number, number]>(entries);
    const expected = [
      [85, 55, 0],
      [70, 78, 0],
      [30, 154, 0],
    ];
    const grouping = 5;
    const results = buildGroups(orders, grouping).valueSeq().toArray();
    expect(results).toEqual(expected);
  });

  it("Should return the original entries if grouping key is <=0", () => {
    const orders = [
      [74.55, 78],
      [32, 66],
      [34.5, 88],
    ];

    const expected = [
      [74.55, 78, 0],
      [34.5, 88, 0],
      [32, 66, 0],
    ];

    const input = SortableMap(orders) as SortedMap<number, number>;
    const grouping = -5;
    const results = buildGroups(input, grouping).valueSeq().toArray();
    expect(results).toEqual(expected);
  });

  it("Should return the original entries if grouping exceeds values", () => {
    const orders = [
      [74.55, 78],
      [5500, 94],
      [34.5, 88],
    ];

    const expected = [
      [5000, 94, 0],
      [74.55, 78, 0],
      [34.5, 88, 0],
    ];

    const input = SortableMap(orders) as SortedMap<number, number>;
    const grouping = 1000;
    const results = buildGroups(input, grouping).valueSeq().toArray();
    expect(results).toEqual(expected);
  });
});
