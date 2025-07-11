import {useMutation, useQueryClient} from '@tanstack/react-query';
import useZusStore from '../../../store.ts';
import type {TodoResponseType} from '../todosList.tsx';
import classNames from 'classnames';
import {CustomButton} from '../../customButton/customButton.tsx';
import {deleteTodo} from '../../../api/todos/deleteTodo.ts';
import {updateTodoStatus} from '../../../api/todos/updateTodoStatus.ts';

import s from './todoItem.module.scss';

type TodoItemPropsType = {
    data: TodoResponseType;
}

export const TodoItem = ({data}: TodoItemPropsType) => {
    const {theme} = useZusStore();
    const queryClient = useQueryClient();

    const { mutate: deleteTodoFunc } = useMutation({
        mutationFn: () => deleteTodo(data.id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
        onError: (error) => {
            console.error('error', error);
        }
    });
    const { mutate: updateTodoFunc } = useMutation({
        mutationFn: () => updateTodoStatus(data.id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
        onError: (error) => {
            console.error('error', error);
        }
    });

    return <article className={classNames(s.itemWrap, {[s.dark]: theme === 'dark'})}>
        <span className={s.idPart}>{data.id}</span>
        <span className={s.completePart}>Is Done: {String(data.completed)}</span>
        <span className={s.bodyPart}>{data.body}</span>
        <div className={s.controls}>
            <CustomButton
                buttonText={data.completed ? 'Undone' : 'Done'}
                isHighLight={!data.completed}
                onClick={() => updateTodoFunc()}
            />
            <CustomButton
                buttonText="Delete"
                isHighLight={false}
                onClick={() => deleteTodoFunc()}
            />
        </div>
    </article>;
};