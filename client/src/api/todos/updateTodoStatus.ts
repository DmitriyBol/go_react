import {DOMAIN} from '../endpoints.ts';

export const updateTodoStatus = async (id: number) => {
    try {
        await fetch(`${DOMAIN}/api/todos`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ID: id})
        });
    } catch (error) {
        console.error(error);
    }
};