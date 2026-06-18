"use client";

import * as React from "react";

import type { CartLine, Fulfillment } from "./types";

const STORAGE_KEY = "pjs-cart-v1";

type CartState = {
  lines: CartLine[];
  fulfillment: Fulfillment;
  promoCode: string;
  tip: number;
  hydrated: boolean;
};

type PersistedState = Omit<CartState, "hydrated">;

type CartAction =
  | { type: "HYDRATE"; state: PersistedState | null }
  | { type: "ADD"; line: CartLine }
  | { type: "UPDATE"; id: string; patch: Partial<CartLine> }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; quantity: number }
  | { type: "SET_FULFILLMENT"; fulfillment: Fulfillment }
  | { type: "SET_PROMO"; promoCode: string }
  | { type: "SET_TIP"; tip: number }
  | { type: "CLEAR" };

const initialState: CartState = {
  lines: [],
  fulfillment: "DELIVERY",
  promoCode: "",
  tip: 0,
  hydrated: false,
};

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, ...(action.state ?? {}), hydrated: true };
    case "ADD":
      return { ...state, lines: [...state.lines, action.line] };
    case "UPDATE":
      return {
        ...state,
        lines: state.lines.map((l) =>
          l.id === action.id ? { ...l, ...action.patch } : l,
        ),
      };
    case "REMOVE":
      return { ...state, lines: state.lines.filter((l) => l.id !== action.id) };
    case "SET_QTY":
      return {
        ...state,
        lines: state.lines
          .map((l) =>
            l.id === action.id
              ? { ...l, quantity: Math.max(0, action.quantity) }
              : l,
          )
          .filter((l) => l.quantity > 0),
      };
    case "SET_FULFILLMENT":
      return { ...state, fulfillment: action.fulfillment };
    case "SET_PROMO":
      return { ...state, promoCode: action.promoCode };
    case "SET_TIP":
      return { ...state, tip: action.tip };
    case "CLEAR":
      return {
        ...initialState,
        fulfillment: state.fulfillment,
        hydrated: true,
      };
    default:
      return state;
  }
}

type CartContextValue = CartState & {
  hydrated: boolean;
  itemCount: number;
  addLine: (line: Omit<CartLine, "id">) => void;
  updateLine: (id: string, patch: Partial<CartLine>) => void;
  removeLine: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  setFulfillment: (f: Fulfillment) => void;
  setPromoCode: (code: string) => void;
  setTip: (tip: number) => void;
  clear: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { hydrated } = state;

  React.useEffect(() => {
    let parsed: PersistedState | null = null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) parsed = JSON.parse(raw) as PersistedState;
    } catch {
      // ignore malformed storage
    }
    dispatch({ type: "HYDRATE", state: parsed });
  }, []);

  React.useEffect(() => {
    if (!hydrated) return;
    const { hydrated: _omit, ...persisted } = state;
    void _omit;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  }, [state, hydrated]);

  const value = React.useMemo<CartContextValue>(() => {
    const newId = () =>
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    return {
      ...state,
      hydrated,
      itemCount: state.lines.reduce((n, l) => n + l.quantity, 0),
      addLine: (line) => dispatch({ type: "ADD", line: { ...line, id: newId() } }),
      updateLine: (id, patch) => dispatch({ type: "UPDATE", id, patch }),
      removeLine: (id) => dispatch({ type: "REMOVE", id }),
      setQuantity: (id, quantity) => dispatch({ type: "SET_QTY", id, quantity }),
      setFulfillment: (fulfillment) =>
        dispatch({ type: "SET_FULFILLMENT", fulfillment }),
      setPromoCode: (promoCode) => dispatch({ type: "SET_PROMO", promoCode }),
      setTip: (tip) => dispatch({ type: "SET_TIP", tip }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
