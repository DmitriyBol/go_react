import {useQuery} from '@tanstack/react-query';

type TodoResponseType = {
    id: number;
    completed: boolean;
    body: string;
}

export const MainData = () => {
    const {data = [], isLoading} = useQuery({
        queryKey: ['todos'],
        queryFn: async () => {
            try {
                const response =  await fetch('http://localhost:4000/api/todos');
                const responseData: TodoResponseType[] = await response.json();
                return responseData;
            } catch (e) {
                console.error(e);
                return [];
            }
        }
    });


    return <div>{isLoading && !data?.length ? 'Loading...' : data.map((elem, index) => {
        return <span key={elem.body + index}>{elem.body}</span>;
    })}</div>;
};