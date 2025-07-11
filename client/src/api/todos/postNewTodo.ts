import {DOMAIN} from '../endpoints.ts';

export const postNewTodo = async (text: string) => {
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