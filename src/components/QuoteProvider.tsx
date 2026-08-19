"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import QuoteModal from "./QuoteModal";

const QuoteContext = createContext<{ openQuote: () => void } | null>(null);

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
}

export default function QuoteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openQuote = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <QuoteContext.Provider value={{ openQuote }}>
      {children}
      {open && <QuoteModal onClose={close} />}
    </QuoteContext.Provider>
  );
}
