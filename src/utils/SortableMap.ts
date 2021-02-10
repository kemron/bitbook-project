import { SortedMap } from "immutable-sorted";
export { SortedMap };

const compare = (key1: number, key2: number): number => {
  const currPrice = Number(key1);
  const nextPrice = Number(key2);
  if (currPrice < nextPrice) return 1;
  else if (currPrice > nextPrice) return -1;
  else return 0;
};
/**
 *
 * @param collection Iterable<[number, V]> initial key value pairing in map
 */
export default function SortableMap<V>(collection?: Iterable<[number, V]>) {
  return SortedMap<number, V>(collection, compare);
}
