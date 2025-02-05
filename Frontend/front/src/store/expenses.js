import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useExpenseStore = create(
  persist(
    (set) => ({
      expensesTotal: 0,
      setExpensesTotal: (expensesTotal) =>
        set((state) => ({
            expensesTotal,
        })),
    }),
    {
      name: "expenses",
    }
  )
);
