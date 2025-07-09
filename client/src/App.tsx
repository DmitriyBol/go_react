import {create} from 'zustand/react';
import {Header} from './components/header/header.tsx';
import {MainData} from './components/mainData/mainData.tsx';

import s from './app.module.scss';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

type StoreType = {
  theme: 'light' | 'dark';
  setTheme: () => void;
};

const queryClient = new QueryClient();

const useZusStore = create<StoreType>()((set) => ({
    theme: 'light',
    setTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

function App() {
    const { theme, setTheme } = useZusStore();

    return (
        <QueryClientProvider client={queryClient}>
            <div className={`${s.wrap} ${theme === 'dark' && s.dark}`}>
                <Header theme={theme} changeTheme={setTheme} />
                <MainData />
            </div>
        </QueryClientProvider>
    );
}

export default App;
