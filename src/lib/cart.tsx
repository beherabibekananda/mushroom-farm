import { createContext, useContext, useState, type ReactNode } from "react";

export type Unit = "kg" | "g" | "pack";

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  quantity: number;
  unit: Unit;
  priceRange?: string; // e.g. "₹1,000 – ₹1,400 / Kg"
}

interface CartCtx {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateItem: (productId: string, partial: Partial<CartItem>) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
}

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.productId === item.productId);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx]!, ...item };
        return next;
      }
      return [...prev, item];
    });
  };

  const updateItem = (productId: string, partial: Partial<CartItem>) => {
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, ...partial } : i)),
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const clearCart = () => setItems([]);

  return (
    <Ctx.Provider
      value={{
        items,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        totalItems: items.reduce((s, i) => s + i.quantity, 0),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
