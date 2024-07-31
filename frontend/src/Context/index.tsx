import { createContext, useReducer, Dispatch, ReactNode } from "react";

interface PlaidState {
  linkSuccess: boolean;
  isItemAccess: boolean;
  isPaymentInitiation: boolean;
  linkToken: string | null;
  accessToken: string | null;
  itemId: string | null;
  isError: boolean;
  backend: boolean;
  products: string[];
  linkTokenError: {
    error_message: string;
    error_code: string;
    error_type: string;
  };
}

const initialState: PlaidState = {
  linkSuccess: false,
  isItemAccess: true,
  isPaymentInitiation: false,
  linkToken: "", // Don't set to null or error message will show up briefly when site loads
  accessToken: null,
  itemId: null,
  isError: false,
  backend: true,
  products: ["transactions"],
  linkTokenError: {
    error_type: "",
    error_code: "",
    error_message: "",
  },
};

type PlaidAction = {
  type: "SET_STATE";
  state: Partial<PlaidState>;
};

interface PlaidContext extends PlaidState {
  dispatch: Dispatch<PlaidAction>;
}

const Context = createContext<PlaidContext>(
  initialState as PlaidContext
);

const { Provider } = Context;
export const PlaidProvider: React.FC<{ children: ReactNode }> = (
  props
) => {
  const reducer = (
    state: PlaidState,
    action: PlaidAction
  ): PlaidState => {
    switch (action.type) {
      case "SET_STATE":
        return { ...state, ...action.state };
      default:
        return { ...state };
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Provider value={{ ...state, dispatch }}>{props.children}</Provider>;
};

export default Context;
