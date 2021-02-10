import { createContext, useCallback, useReducer } from "react";

const DEFAULT_PRODUCT: string = "PI_XBTUSD";
const DEFAULT_GROUPSIZE: number = 500;

const UPDATE_PRODUCT = "PRODUCT/UPDATE";
const UPDATE_BOOK_ENTRY = "BOOK/UPDATE";

type Order = [price: number, size: number];

type State = {
  selectedProduct: string;
  grouping: number;
  asks: Order[];
  bids: Order[];
};

type SnapShot = {
  asks?: Order[];
  bids?: Order[];
};

type Action = {
  type: string;
  payload: any;
};

type Reducer = (state: State, action: Action) => State;

type Context = {
  state: State;
  selectProduct: (product: string) => void;
  updateSnapshot: (bids: Order[], asks: Order[]) => void;
};

const StoreContext = createContext<Context | null>(null);

export { StoreContext };

const INITIAL_STORE = {
  selectedProduct: DEFAULT_PRODUCT,
  grouping: DEFAULT_GROUPSIZE,
  bids: new Array(100000),
  asks: new Array(100000),
};

function updateProduct(product: string): Action {
  return {
    type: UPDATE_PRODUCT,
    payload: product,
  };
}

// @ts-ignore
const reducer: Reducer = (state: State, { type, payload }: Action) => {
  switch (type) {
    case UPDATE_PRODUCT: {
      return { ...state, selectedProduct: payload };
    }

    case UPDATE_BOOK_ENTRY: {
      const { bids, asks } = payload as SnapShot;

      const newBids = [...state.bids];
      if (bids?.length) {
        bids.forEach((bid) => {
          const index = newBids.findIndex((b) => b && b[0] === bid[0]);
          if (index < 0) {
            newBids.push(bid);
          } else if (bid[1] === 0) {
            newBids.splice(index, 1);
          } else {
            newBids[index][1] = bid[1];
          }
        });
      }

      const newAsks = [...state.asks];
      if (asks?.length) {
        asks.forEach((ask) => {
          const index = newAsks.findIndex((a) => a && a[0] === ask[0]);
          if (index < 0) {
            newAsks.push(ask);
          } else if (ask[1] === 0) {
            newAsks.splice(index, 1);
          } else {
            newAsks[index][1] = ask[1];
          }
        });
      }
      return { ...state, bids, asks };
    }

    default:
      return state;
  }
};

interface StoreProviderProps {
  children: React.ReactNode;
}

export default function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer<Reducer>(reducer, INITIAL_STORE);

  const selectProduct = useCallback((product: string) => {
    dispatch(updateProduct(product));
  }, []);

  const updateSnapshot = useCallback((bids: Order[], asks: Order[]) => {
    dispatch({
      type: UPDATE_BOOK_ENTRY,
      payload: {
        bids,
        asks,
      },
    });
  }, []);

  const data = {
    state,
    selectProduct,
    updateSnapshot,
  };

  return <StoreContext.Provider value={data}>{children}</StoreContext.Provider>;
}
