import {type ChangeEvent, useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {postNewTodo} from '../../../api/todos/postNewTodo.ts';
import {CustomButton} from '../../customButton/customButton.tsx';
import classNames from 'classnames';
import useZusStore from '../../../store.ts';

import s from './addNewTodo.module.scss';

export const AddNewTodo = () => {
    const {theme} = useZusStore();
    const [text, setText] = useState('');
    const queryClient = useQueryClient();

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const submitData = () => {
        if (text && text.length >= 10) {
            addTodo(text);
            setText('');
        }
    };

    const { mutate: addTodo } = useMutation({
        mutationFn: postNewTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
        onError: (error) => {
            console.error('error', error);
        }
    });

    return (
        <div className={classNames(s.addTodoRow, {[s.dark]: theme === 'dark'})}>
            <textarea
                placeholder={'min 10 characters'}
                className={classNames(s.textArea, {[s.dark]: theme === 'dark'})}
                onChange={(e) => onChangeHandler(e)}
                value={text}/>
            <CustomButton
                buttonText="Add new todo"
                isHighLight
                onClick={submitData}
            />
        </div>
    );
};