import {useQuery} from '@tanstack/react-query';
import {prefetchProducts} from '../../api/products/prefetchProducts.ts';
import {Skeleton} from '../skeleton/skeleton.tsx';
import {ProductItem, type ProductType} from './productItem/productItem.tsx';

import s from './productList.module.scss';

const MIN_PRODUCTS_ON_PAGE = 12;

export const ProductList = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ['todos'],
        queryFn: async () => prefetchProducts(MIN_PRODUCTS_ON_PAGE),
    });
    
    return (
        <div className={s.productsWrapper}>{
            !isLoading && data?.data?.length || !isError ? (data?.data?.map((product: ProductType) => {
                return <ProductItem {...product} key={product.id} />;
            })) : (
                Array(MIN_PRODUCTS_ON_PAGE).fill('').map((_, index) => {
                    return <Skeleton width="280" height="400" radius={10} key={index} />;
                }))}</div>);
};