import React, {type ChangeEvent, useState} from 'react';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {DOMAIN} from '../../../api/endpoints.ts';

import s from './addNewTodo.module.scss';

const postNewTodo = async (text: string) => {
    try {
        await fetch(`${DOMAIN}/api/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ body: text })
        });
    } catch (error) {
        console.error(error);
    }
};

export const AddNewTodo = () => {
    const [isOpen, setOpen] = useState(false);
    const [text, setText] = useState('');
    const queryClient = useQueryClient();

    const changeVisibility = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(prevState => !prevState);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const submitData = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (text && text.length >= 10) {
            addTodo(text);
            setText('');
            setOpen(false);
        }
    };

    const { mutate: addTodo } = useMutation({
        mutationFn: postNewTodo,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
        onError: (error) => {
            console.error('error', error);
        }
    });
    
    return <div className={`${s.addNewWrap} ${isOpen && s.opened}`} onClick={() => setOpen(true)}>{isOpen ? '' : 'Add new'}
        {isOpen && (
            <>
                <button
                    className={s.cross}
                    onClick={(e) => changeVisibility(e)}
                >
                    X
                </button>
                <textarea
                    placeholder={'min 10 characters'}
                    className={s.input}
                    onChange={(e) => onChangeHandler(e)}
                    value={text} />
                <button
                    className={s.btn}
                    type="button"
                    onClick={(e) => submitData(e)}
                >
                    Add new todo
                </button>
            </>
        )}
    </div>;
};