import SortableMap from "utils/SortableMap";
import { computeGroupsSum } from "..";

describe("computeGroupsSum", () => {
  it("Should enter the sum of each each entry as an aggregate of the values below it", () => {
    const orders = [
      [47000, [47000, 500, 0]],
      [55000, [55000, 8000, 0]],
      [64500, [64500, 9500, 0]],
      [65000, [65000, 6000, 0]],
    ];

    const orderGroups = SortableMap(orders);

    const expected = [
      [65000, 6000, 24000],
      [64500, 9500, 18000],
      [55000, 8000, 8500],
      [47000, 500, 500],
    ];
    const results = computeGroupsSum(orderGroups).toArray();

    expect(results).toEqual(expected);
    expect(true).toBeTruthy();
  });

  it("Should return empty sequence if groups are empty", () => {
    const orderGroups = SortableMap([]);
    const results = computeGroupsSum(orderGroups).toArray();
    expect(results).toHaveLength(0);
  });
});
