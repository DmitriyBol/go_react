import type {TodoResponseType} from '../../components/todoList/todosList.tsx';
import {DOMAIN} from '../endpoints.ts';

export const prefetchTodos=  async () => {
    try {
        const response =  await fetch(`${DOMAIN}/api/todos`);
        const responseData: TodoResponseType[] = await response.json();
        return responseData;
    } catch (e) {
        console.error(e);
        return [];
    }
};