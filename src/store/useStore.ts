import { create } from 'zustand';
import { Column, Application } from '../types/insurance';

interface Store {
  columns: Column[];
  applications: Application[];
  selectedInsuranceType: string | null;
  setColumns: (columns: Column[]) => void;
  toggleColumn: (columnId: string) => void;
  setSelectedInsuranceType: (type: string | null) => void;
  setApplications: (applications: Application[]) => void;
  reorderApplications: (oldIndex: number, newIndex: number) => void;
}

export const useStore = create<Store>((set) => ({
  columns: [],
  applications: [],
  selectedInsuranceType: null,
  setColumns: (columns) => set({ columns }),
  toggleColumn: (columnId) =>
    set((state) => ({
      columns: state.columns.map((col) =>
        col.id === columnId ? { ...col, visible: !col.visible } : col
      ),
    })),
  setSelectedInsuranceType: (type) => set({ selectedInsuranceType: type }),
  setApplications: (applications) => set({ applications }),
  reorderApplications: (oldIndex: number, newIndex: number) =>
    set((state) => {
      const newApplications = [...state.applications];
      const [removed] = newApplications.splice(oldIndex, 1);
      newApplications.splice(newIndex, 0, removed);
      return { applications: newApplications };
    }),
}));