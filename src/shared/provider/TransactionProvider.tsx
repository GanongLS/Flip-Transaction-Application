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
import {fetchError} from '../helpers/fetchError';
import {Transaction, Transactions} from '../model/Transaction';

export enum SortKind {
  Default = 'URUTKAN',
  NameAsc = 'Name A-Z',
  NameDesc = 'Name Z-A',
  DateNewest = 'Tanggal Terbaru',
  DateOldest = 'Tanggal Terlama',
}

enum ActionKind {
  initSort = 'initSort',
  Entry = 'entry',
  Fetch = 'fetch',
  Search = 'search',
  Sort = 'sort',
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
  apiTransactions: Transaction[];
  transactions: Transaction[];
  sortValues: SortKind[];
  activeSort: SortKind;
}

// An interface for our method
interface TrxMethod {
  initSortArray: () => void;
  fetchTransactions: () => Promise<boolean>;
  testFunction: () => void;
  onSearchTrx: (key: string) => void;
  onSortTrx: (key: SortKind) => void;
}

const initialContextState: TrxState = {
  isFetching: true,
  isSearching: false,
  apiTransactions: [],
  transactions: [],
  sortValues: [],
  activeSort: SortKind.Default,
};

const initialContextMethod: TrxMethod = {
  initSortArray: () => {},
  fetchTransactions: () => Promise.resolve(false),
  testFunction: () => {},
  onSearchTrx: () => {},
  onSortTrx: () => {},
};

const trxStateContext = createContext<TrxState>(initialContextState);
const trxMethodContext = createContext<TrxMethod>(initialContextMethod);

const TransactionProvider = memo((props: PropsWithChildren<{}>) => {
  const {children} = props;

  const reducer = (state: TrxState, action: TrxAction) => {
    switch (action.type) {
      case ActionKind.initSort:
        return {
          ...state,
          sortValues: action.payload.sortValues,
        };
      case ActionKind.Entry:
        return {
          ...state,
          apiTransactions: action.payload.transactions,
          transactions: action.payload.transactions,
        };
      case ActionKind.Search:
        return {
          ...state,
          transactions: action.payload.transactions,
        };
      case ActionKind.Sort:
        return {
          ...state,
          transactions: action.payload.transactions,
          activeSort: action.payload.activeSort,
        };
      case ActionKind.Fetch:
        return {
          ...state,
          isFetching: action.payload.isFetching,
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
      initSortArray: () => {
        let array = Object.values(SortKind);
        console.log(array);
        dispatch({
          type: ActionKind.initSort,
          payload: {...state, sortValues: array},
        });
      },
      fetchTransactions: async (): Promise<boolean> => {
        try {
          const result = await axios.get(`${baseURL}`, {
            timeout: defaultTimeout,
          });
          let transactions: Transactions = result.data;
          let sortedTransactions: Transactions = Object.fromEntries(
            Object.entries(transactions).sort(([keyA], [keyB]) =>
              keyA.localeCompare(keyB),
            ),
          );
          var trxList = Object.keys(sortedTransactions).map(
            key => sortedTransactions[key],
          );

          dispatch({
            type: ActionKind.Entry,
            payload: {...state, transactions: trxList},
          });

          return true;
        } catch (err) {
          const Err = fetchError(err, 'Provider');
          console.log({Err});
          return false;
        }
      },
      testFunction: () => {
        console.log('test function');
      },
      onSearchTrx: (key: string) => {
        key = key.toLowerCase();
        let filteredTrx = state.apiTransactions.filter(el => {
          return (
            el.beneficiary_name.toLowerCase().includes(key) ||
            el.sender_bank.toLowerCase().includes(key) ||
            el.beneficiary_bank.toLowerCase().includes(key) ||
            el.amount.toString().includes(key)
          );
        });
        dispatch({
          type: ActionKind.Search,
          payload: {...state, transactions: filteredTrx},
        });
      },
      onSortTrx: (key: SortKind) => {
        let sortedTrx: Transaction[] = [];
        switch (key) {
          case SortKind.NameAsc:
            sortedTrx = state.transactions.sort((a, b) =>
              a.beneficiary_name < b.beneficiary_name
                ? -1
                : a.beneficiary_name > b.beneficiary_name
                ? 1
                : 0,
            );

            break;

          case SortKind.NameDesc:
            sortedTrx = state.transactions.sort((a, b) =>
              a.beneficiary_name > b.beneficiary_name
                ? -1
                : a.beneficiary_name < b.beneficiary_name
                ? 1
                : 0,
            );
            break;

          case SortKind.DateNewest:
            sortedTrx = state.transactions.sort(
              (a, b) =>
                new Date(a.created_at).getUTCDate() -
                new Date(b.created_at).getUTCDate(),
            );
            break;

          case SortKind.DateOldest:
            sortedTrx = state.transactions.sort(
              (a, b) =>
                new Date(b.created_at).getUTCDate() -
                new Date(a.created_at).getUTCDate(),
            );
            break;

          default:
            sortedTrx = state.apiTransactions;
            break;
        }

        dispatch({
          type: ActionKind.Sort,
          payload: {...state, transactions: sortedTrx, activeSort: key},
        });
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
    throw new Error('useTrxState Error is not Initialized');
  }
  return context;
};
export const useTrxMethod = (): TrxMethod => {
  const context = useContext(trxMethodContext);
  if (context === undefined || context == initialContextMethod) {
    throw new Error('useTrxMethod Error is not Initialized');
  }
  return context;
};

export default TransactionProvider;
