// Shared calculator state for the Calculator and Dossier (in-memory React state).
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  computeLedger,
  emptyCalculatorState,
  type CalculatorState,
  type Ledger,
} from "../../lib/calculator";

interface CalculatorStoreValue {
  state: CalculatorState;
  ledger: Ledger;
  patch: (update: Partial<CalculatorState>) => void;
}

const CalculatorStoreContext = createContext<CalculatorStoreValue | null>(null);

export default function CalculatorStore({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CalculatorState>(emptyCalculatorState);
  const ledger = useMemo(() => computeLedger(state), [state]);

  const patch = useCallback((update: Partial<CalculatorState>) => {
    setState((prev) => ({ ...prev, ...update }));
  }, []);

  const value = useMemo(() => ({ state, ledger, patch }), [state, ledger, patch]);

  return <CalculatorStoreContext.Provider value={value}>{children}</CalculatorStoreContext.Provider>;
}

export function useCalculatorStore(): CalculatorStoreValue {
  const context = useContext(CalculatorStoreContext);
  if (!context) throw new Error("useCalculatorStore must be used inside CalculatorStore");
  return context;
}
