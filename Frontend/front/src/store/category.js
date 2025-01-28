import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCategoryStore = create(persist(
  (set) => ({
    categorias: [],
    setCategorias: (categorias) => set(state => ({
      categorias
    }))
  }), {
  name: 'category'
}
))
