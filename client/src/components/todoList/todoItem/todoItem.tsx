import useZusStore from '../../../store.ts';
import type {TodoResponseType} from '../todosList.tsx';

import s from './todoItem.module.scss';

type TodoItemPropsType = {
    data: TodoResponseType;
}

export const TodoItem = ({data}: TodoItemPropsType) => {
    const {theme} = useZusStore();

    return <article className={`${s.itemWrap} ${theme === 'dark' && s.dark}`}>
        <span className={s.idPart}>{data.id}</span>
        <span className={s.completePart}>Status: {String(data.completed)}</span>
        <span className={s.bodyPart}>{data.body}</span>
        <button className={s.btn}>{data.completed ? 'Undone' : 'Set Done'}</button>
    </article>;
};