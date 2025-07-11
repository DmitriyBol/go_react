import {create} from 'zustand/react';

type StoreType = {
    theme: 'light' | 'dark';
    setTheme: () => void;
    activeMenuIndex: number;
    setActiveMenuIndex: (index: number) => void;
};

const useZusStore = create<StoreType>()((set) => ({
    theme: 'light',
    activeMenuIndex: 0,
    setActiveMenuIndex: (num) =>
        set(() => ({ activeMenuIndex: num })),
    setTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useZusStore;