import { createContext, useCallback, useReducer } from "react";
import { SortedMap } from "utils/SortableMap";
import {
  UPDATE_LISTING,
  UPDATE_PRODUCT,
  BUILD_LISTING,
} from "reducer/actionTypes";
import { DEFAULT_GROUPSIZE, DEFAULT_PRODUCT } from "atoms/constants";
import reducer, { State, Order, Action } from "reducer";

export type { State };
type Reducer = (state: State, action: Action) => State;

type Context = {
  state: State;
  selectProduct: (product: string) => void;
  updateSnapshot: (
    bids: Order[],
    asks: Order[],
    productId: string,
    isNewSnapshot?: boolean
  ) => void;
};

export const StoreContext = createContext<Context | null>(null);

const INITIAL_STATE = {
  selectedProduct: DEFAULT_PRODUCT,
  grouping: DEFAULT_GROUPSIZE,
  bids: SortedMap<number, number>([]),
  asks: SortedMap<number, number>([]),
};

function updateProduct(product: string): Action {
  return {
    type: UPDATE_PRODUCT,
    payload: product,
  };
}

interface StoreProviderProps {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer<Reducer>(reducer, INITIAL_STATE);

  /**
   * Action to update the selected product
   */
  const selectProduct = useCallback(
    (product: string) => {
      if (state.selectedProduct !== product) {
        dispatch(updateProduct(product));
      }
    },
    [state.selectedProduct]
  );

  /**
   * Fires action to create orders snapshot
   */
  const updateSnapshot = useCallback(
    (
      bids: Order[],
      asks: Order[],
      productId,
      isNewSnapshot: boolean = false
    ) => {
      const type = isNewSnapshot ? BUILD_LISTING : UPDATE_LISTING;
      dispatch({
        type,
        payload: {
          bids,
          asks,
          product: productId,
        },
      });
    },
    []
  );

  const data = {
    state,
    selectProduct,
    updateSnapshot,
  };

  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>;
}
