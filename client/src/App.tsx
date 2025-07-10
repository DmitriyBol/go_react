import {Header} from './components/header/header.tsx';
import {TodosList} from './components/todoList/todosList.tsx';

import s from './app.module.scss';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import useZusStore from './store.ts';

const queryClient = new QueryClient();

function App() {
    const { theme, setTheme } = useZusStore();

    return (
        <QueryClientProvider client={queryClient}>
            <div className={`${s.wrap} ${theme === 'dark' && s.dark}`}>
                <Header theme={theme} changeTheme={setTheme} />
                <TodosList />
            </div>
        </QueryClientProvider>
    );
}

export default App;
