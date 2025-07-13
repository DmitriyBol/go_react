import {useQuery} from '@tanstack/react-query';
import {TodoItem} from './todoItem/todoItem.tsx';

import s from './todoList.module.scss';
import {AddNewTodo} from './addNewTodo/addNewTodo.tsx';
import {prefetchTodo} from '../../api/todos/prefetchTodo.ts';
import {Skeleton} from '../skeleton/skeleton.tsx';

export type TodoResponseType = {
    id: number;
    completed: boolean;
    body: string;
}

export const TodosList = () => {
    const {data = [], isLoading, isError} = useQuery({
        queryKey: ['todos'],
        queryFn: async () => prefetchTodo(),
    });
    
    const isDataFetched = !isLoading && data?.length;

    return <section className={s.sectionWrap}>
        <AddNewTodo disabled={!isDataFetched || isError} />
        {isDataFetched && !isError ? data
            .sort((a, b) => a.id - b.id)
            .map((elem, index) => {
                return <TodoItem key={elem.body + index} data={elem} />;}) : Array(5).fill('').map((_, index) => {
            return <Skeleton height="55" radius={10} key={`skeleton-${index}`} />;
        })}
    </section>;
};