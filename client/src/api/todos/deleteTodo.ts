import {DOMAIN} from '../endpoints.ts';

export const deleteTodo = async (id: number) => {
    try {
        await fetch(`${DOMAIN}/api/todos`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ID: id })
        });
    } catch (error) {
        console.error(error);
    }
};