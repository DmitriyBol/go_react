import s from './skeleton.module.scss';
import useZusStore from '../../store.ts';
import classNames from 'classnames';

type SkeletonPropsType = {
    width?: string;
    height?: string;
    radius?: number;
};

export const Skeleton = ({
    width,
    height,
    radius,
}: SkeletonPropsType) => {
    const {theme} = useZusStore();

    return (<div 
        className={classNames(s.skeletonWrap, {[s.dark]: theme === 'dark'})}
        style={{
            width: width ? `${width}px` : '100%', 
            height: height ? `${height}px` : '100%',
            borderRadius: radius ? `${radius}px` : 'none',
        }} />);
};