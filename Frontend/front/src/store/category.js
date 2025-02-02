import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCategoryStore = create(persist(
  (set) => ({
    categorias: [],
    pathCategorias: [],
    setCategorias: (categorias) => set(state => ({
      categorias
    })),
    setPathCategorias: (pathCategorias) => set(state => ({
      pathCategorias
    })),
    cleanCategorias: () => set(state => ({
      categorias: [],
      pathCategorias: [],
    }))
  }), {
  name: 'categories'
}
))
