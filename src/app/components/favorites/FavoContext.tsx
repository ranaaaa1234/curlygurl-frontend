"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
}

interface FavoContextProps {
  favo: Product[];
  addToFavo: (product: Product) => void;
  removeFromFavo: (id: string) => void;
  clearFavo: () => void;
}

const FavoContext = createContext<FavoContextProps | undefined>(undefined);

export const FavoProvider = ({ children }: { children: ReactNode }) => {
  const [favo, setFavo] = useState<Product[]>([]);

  const addToFavo = (product: Product) => {
    setFavo((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromFavo = (id: string) => {
    setFavo((prev) => prev.filter((p) => p.id !== id));
  };

  const clearFavo = () => setFavo([]);

  return (
    <FavoContext.Provider value={{ favo, addToFavo, removeFromFavo, clearFavo }}>
      {children}
    </FavoContext.Provider>
  );
};

export const useFavo = () => {
  const context = useContext(FavoContext);
  if (!context) {
    throw new Error("useFavo must be used within a FavoProvider");
  }
  return context;
};
