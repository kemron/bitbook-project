import { UPDATE_LISTING, UPDATE_PRODUCT, BUILD_LISTING } from "./actionTypes";
import SortableMap, { SortedMap } from "utils/SortableMap";
import { processOrders } from "./utils";

export type Order = [price: number, size: number];

export type State = {
  selectedProduct: string;
  grouping: number;
  asks: SortedMap<number, number>;
  bids: SortedMap<number, number>;
};

type SnapShot = {
  product: string;
  asks: Order[];
  bids: Order[];
};

export type Action = {
  type: string;
  payload: any;
};

type Reducer = (state: State, action: Action) => State;

const StateReducer: Reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case UPDATE_PRODUCT: {
      return {
        ...state,
        selectedProduct: payload,
        bids: SortableMap(),
        asks: SortableMap(),
      };
    }

    case BUILD_LISTING: {
      const { bids, asks, product } = payload as SnapShot;
      const selectedProduct =
        product === state.selectedProduct ? state.selectedProduct : product;
      return {
        ...state,
        bids: SortableMap(bids),
        asks: SortableMap(asks),
        selectedProduct,
      };
    }

    case UPDATE_LISTING: {
      const { bids, asks } = payload as SnapShot;

      let currentBids = state.bids;
      let currentAsks = state.asks;
      if (bids.length > 0) {
        currentBids = processOrders(currentBids, bids);
      }
      if (asks.length > 0) {
        currentAsks = processOrders(currentAsks, asks);
      }
      return { ...state, bids: currentBids, asks: currentAsks };
    }

    default:
      return state;
  }
};

export default StateReducer;
