import axios from 'axios';
import React, {
  createContext,
  memo,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
} from 'react';
import {baseURL, defaultTimeout} from '../env/API';
import {fetchError} from '../Helpers/fetchError';

enum ActionKind {
  Fetch = 'fetch',
  Search = 'search',
  Reset = 'reset',
}

interface Trxpayload {}

// An interface for our actions
interface TrxAction {
  type: ActionKind;
  payload: TrxState;
}

// An interface for our state
interface TrxState {
  isFetching: boolean;
  isSearching: boolean;
  totalItems: Number;
  totalPrice: String;
  cart: Array<Number>;
}

interface TrxMethod {
  fetchTransactions: () => Promise<boolean>;
}

const initialContextState: TrxState = {
  isFetching: true,
  isSearching: false,
  totalItems: 0,
  totalPrice: '',
  cart: [],
};

const initialContextMethod: TrxMethod = {
  fetchTransactions: () => Promise.resolve(false),
};

// export type UseTrxStateType = ReturnType<TrxState>;
// export type UseTrxMethodType = ReturnType<typeof useTrxMethod>;

const trxStateContext = createContext<TrxState>(initialContextState);
const trxMethodContext = createContext<TrxMethod>(initialContextMethod);

const TransactionProvider = memo((props: PropsWithChildren<{}>) => {
  const {children} = props;

  const reducer = (state: TrxState, action: TrxAction) => {
    switch (action.type) {
      case ActionKind.Fetch:
        return {
          ...state,
          isFetching: action.payload.isFetching,
        };
      case ActionKind.Search:
        return {
          ...state,
          isSearching: action.payload.isSearching,
        };

      case ActionKind.Reset:
        return {
          ...initialContextState,
        };
      default:
        throw new Error(
          `Unexpected type of action. \n the actiontype was ${action.type}`,
        );
    }
  };

  const [state, dispatch] = useReducer(reducer, initialContextState);

  const trxState: TrxState = useMemo(() => state, [state]);

  const trxMethod = useMemo(
    () => ({
      fetchTransactions: async (): Promise<boolean> => {
        try {
          const request = await axios.get(`${baseURL}`, {
            timeout: defaultTimeout,
          });
          console.log({request});
          return true;
        } catch (err) {
          const Err = fetchError(err, 'authDevice');
          console.log({Err});
          return false;
        }
      },
    }),
    [dispatch, state],
  );

  return (
    <trxStateContext.Provider value={trxState}>
      <trxMethodContext.Provider value={trxMethod}>
        {children}
      </trxMethodContext.Provider>
    </trxStateContext.Provider>
  );
});

export const useTrxState = (): TrxState => {
  const context = useContext(trxStateContext);
  if (context === undefined) {
    throw new Error('useTrxState Error');
  }
  return context;
};
export const useTrxMethod = (): TrxMethod => {
  const context = useContext(trxMethodContext);
  if (context === undefined) {
    throw new Error('useTrxMethod Error');
  }
  return context;
};

export default TransactionProvider;
