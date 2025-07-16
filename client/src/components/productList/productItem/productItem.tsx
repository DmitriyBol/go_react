import type {FC} from 'react';
import s from './productItem.module.scss';
import {CustomButton} from '../../customButton/customButton.tsx';
import useZusStore from '../../../store.ts';
import classNames from 'classnames';

type DimensionsType = {
    width: number;
    height: number;
    depth: number;
}
type ReviewType = {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

// Тип для метаданных
type MetaType = {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
}

export type ProductType = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: DimensionsType;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: ReviewType[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: MetaType;
    images: string[];
    thumbnail: string;
}

const reviewsMed = (array: ReviewType[]): number => {
    if (array.length === 1) {
        return array[0].rating;
    }

    let count = 0;
    array.forEach(review => {
        count = count + review.rating;
        return count;
    });

    const result = (count / array.length - 1).toFixed(0);
    return Number(result);
};

export const ProductItem: FC<ProductType> = (data) => {
    const {theme} = useZusStore();
    const medRating = reviewsMed(data.reviews);

    return <div className={classNames(s.productWrap, {[s.dark]: theme === 'dark'})}>
        <div className={s.imageCont}>
            <img className={s.image} src={data.images[0]} alt=""/>
        </div>
        <div className={s.priceAndRating}>
            <span className={s.price}>${data.price}</span>
            <span className={s.rating}>{medRating >= 4 ? '⭐' : '★'} {medRating} ({data.reviews.length})</span>
        </div>

        <h3 className={s.title}>{data.brand}</h3>

        <div className={s.btnSection}>
            <CustomButton buttonText="Buy" isHighLight/>
            <CustomButton buttonText="Similar" isHighLight={false}/>
        </div>
    </div>;
};