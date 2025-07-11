import useZusStore from '../../../store.ts';
import type {TodoResponseType} from '../todosList.tsx';
import classNames from 'classnames';
import {CustomButton} from '../../customButton/customButton.tsx';

import s from './todoItem.module.scss';

type TodoItemPropsType = {
    data: TodoResponseType;
}

export const TodoItem = ({data}: TodoItemPropsType) => {
    const {theme} = useZusStore();

    return <article className={classNames(s.itemWrap, {[s.dark]: theme === 'dark'})}>
        <span className={s.idPart}>{data.id}</span>
        <span className={s.completePart}>Is Done: {String(data.completed)}</span>
        <span className={s.bodyPart}>{data.body}</span>
        <div className={s.controls}>
            <CustomButton buttonText={data.completed ? 'Undone' : 'Done'} isHighLight={!data.completed} />
            <CustomButton buttonText="Delete" isHighLight={false} />
        </div>
    </article>;
};