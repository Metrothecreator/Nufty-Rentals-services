"use client";

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";
import BookingModal from "./BookingModal";
import type { BookingPrefill } from "@/lib/booking";

type BookingContextValue = {
  openBooking: (prefill?: BookingPrefill) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}

type Request = { prefill?: BookingPrefill; nonce: number };

export default function BookingProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<Request | null>(null);
  const nonceRef = useRef(0);

  const openBooking = useCallback((prefill?: BookingPrefill) => {
    nonceRef.current += 1;
    setRequest({ prefill, nonce: nonceRef.current });
  }, []);

  const close = useCallback(() => setRequest(null), []);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      {request && (
        <BookingModal key={request.nonce} prefill={request.prefill} onClose={close} />
      )}
    </BookingContext.Provider>
  );
}
