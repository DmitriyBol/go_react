import {create} from 'zustand/react';

type StoreType = {
    theme: 'light' | 'dark';
    setTheme: () => void;
};

const useZusStore = create<StoreType>()((set) => ({
    theme: 'light',
    setTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

export default useZusStore;