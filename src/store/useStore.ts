import { create } from 'zustand';
import { Column } from '../types/insurance';

interface Store {
  columns: Column[];
  selectedInsuranceType: string | null;
  setColumns: (columns: Column[]) => void;
  toggleColumn: (columnId: string) => void;
  setSelectedInsuranceType: (type: string | null) => void;
}

export const useStore = create<Store>((set) => ({
  columns: [],
  selectedInsuranceType: null,
  setColumns: (columns) => set({ columns }),
  toggleColumn: (columnId) =>
    set((state) => ({
      columns: state.columns.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      ),
    })),
  setSelectedInsuranceType: (type) => set({ selectedInsuranceType: type }),
}));