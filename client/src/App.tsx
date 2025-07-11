import {Header} from './components/header/header.tsx';
import {TodosList} from './components/todoList/todosList.tsx';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import useZusStore from './store.ts';

import s from './app.module.scss';
import classNames from 'classnames';
import {createBrowserRouter, RouterProvider} from 'react-router';

const router = createBrowserRouter([
    {
        path: '/',
        element: <>
            <Header />
        </>,
    },
    {
        path: '/todo',
        element: <>
            <Header />
            <TodosList />
        </>,
    },
    {
        path: '/products',
        element: <>
            <Header />
        </>,
    },
]);

const queryClient = new QueryClient();

function App() {
    const {theme} = useZusStore();

    return (
        <QueryClientProvider client={queryClient}>
            <div className={classNames(s.wrap, {[s.dark]: theme === 'dark'})}>
                <RouterProvider router={router} />
            </div>
        </QueryClientProvider>
    );
}

export default App;
