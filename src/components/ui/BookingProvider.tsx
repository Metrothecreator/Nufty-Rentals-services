"use client";
import { createContext, useCallback, useContext, useState } from "react";
import BookingModal from "./BookingModal";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useBooking = () => useContext(Ctx);

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <BookingModal open={isOpen} onClose={close} />
    </Ctx.Provider>
  );
}
