import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useBudgetStore = create(
  persist(
    (set) => ({
      presupuestoInicial: null,
      presupuestoTotal: null,
      idPresupuesto: null,
      setPresupuestoInicial: (presupuestoInicial) =>
        set((state) => ({
          presupuestoInicial,
        })),
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
