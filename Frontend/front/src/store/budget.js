import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBudgetStore = create(
  persist(
    (set) => ({
      presupuestoTotal: null,
      idPresupuesto: null,
      setPresupuesto: (presupuestoTotal) =>
        set((state) => ({
          presupuestoTotal,
        })),
      setIdPresupuesto: (idPresupuesto) =>
        set((state) => ({
          idPresupuesto,
        })),
    }),
    {
      name: "budget",
    }
  )
);