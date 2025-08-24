import { create } from 'zustand'

interface AppState {
  isLoading: boolean
  hasError: boolean
  errorMessage: string
  setLoading: (loading: boolean) => void
  setError: (error: boolean, message?: string) => void
  clearError: () => void
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: false,
  hasError: false,
  errorMessage: '',
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error, message = '') => set({ hasError: error, errorMessage: message }),
  clearError: () => set({ hasError: false, errorMessage: '' })
}))
