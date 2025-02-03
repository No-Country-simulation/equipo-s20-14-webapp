import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBudgetStore = create(
  persist(
    (set) => ({
      presupuestoTotal: null,
      setPresupuesto: (presupuestoTotal) =>
        set((state) => ({
          presupuestoTotal,
        })),
    }),
    {
      name: 'budget',
    }
  )
);
