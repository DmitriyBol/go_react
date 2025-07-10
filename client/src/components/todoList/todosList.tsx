import {useQuery} from '@tanstack/react-query';
import {TodoItem} from './todoItem/todoItem.tsx';

import s from './todoList.module.scss';
import {AddNewTodo} from './addNewTodo/addNewTodo.tsx';
import {prefetchTodos} from '../../api/refetchTodos/prefetchTodos.ts';

export type TodoResponseType = {
    id: number;
    completed: boolean;
    body: string;
}

export const TodosList = () => {
    const {data = [], isLoading} = useQuery({
        queryKey: ['todos'],
        queryFn: async () => prefetchTodos(),
    });

    return <section className={s.sectionWrap}>
        <AddNewTodo />
        {isLoading && !data?.length ? 'Loading...' : data.map((elem, index) => {
            return <TodoItem key={elem.body + index} data={elem} />;
        })}</section>;
};