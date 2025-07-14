import {useQuery} from '@tanstack/react-query';
import {prefetchProducts} from '../../api/products/prefetchProducts.ts';

export const ProductList = () => {
    const {data = [], isLoading, isError} = useQuery({
        queryKey: ['todos'],
        queryFn: async () => prefetchProducts(10),
    });

    console.log('data', data, 'isLoading', isLoading, 'isError', isError);
    
    return (<div>123123</div>);
};