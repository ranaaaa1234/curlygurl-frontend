"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  use,
} from "react";
import { getFavorites, addToFavorites, removeFromFavorites } from "./favoApi";

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
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;

    getFavorites(token)
      .then((data) => setFavo(data))
      .catch((err) => console.error("Error fetching favorites:", err));
  }, [token]);

  const addToFavo = async (product: Product) => {
    if (!token) {
      console.warn("No token found");
      return;
    }

    try {
      setFavo((prev) => {
        const alreadyAdded = prev.some((item) => item.id === product.id);
        if (alreadyAdded) return prev;
        return [...prev, product];
      });

      await addToFavorites(product.id, token);
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }
  };

  const removeFromFavo = async (id: string) => {
    if (!token) {
      console.warn("No token found");
      return;
    }
    try {
      await removeFromFavorites(id, token);
      setFavo((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error removing from favorites:", err);
    }
  };

  useEffect(() => {
    const handleStorage = () => {
        const token = localStorage.getItem("token");
        if (token) {
            getFavorites(token)
                .then((data) => setFavo(data))
                .catch((err) => console.error("Error fetching favorites:", err));
        } else {
            setFavo([]);
        }
    }; 

    handleStorage();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
}, []);

  const clearFavo = () => setFavo([]);

  return (
    <FavoContext.Provider
      value={{ favo, addToFavo, removeFromFavo, clearFavo }}
    >
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
