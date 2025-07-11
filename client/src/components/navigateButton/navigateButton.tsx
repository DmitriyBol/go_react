import s from './navigateButton.module.scss';
import useZusStore from '../../store.ts';
import classNames from 'classnames';
import {useEffect} from 'react';
import {Link} from 'react-router';

export type NavigateButtonPropsType = {
    linkText: string;
    to: string;
    index: number;
}

export const NavigateButton = (
    {linkText, to, index}: NavigateButtonPropsType
) => {
    const {theme, setActiveMenuIndex, activeMenuIndex} = useZusStore();

    useEffect(() => {
        console.log('activeMenuIndex', activeMenuIndex);
    }, [activeMenuIndex]);

    return (
        <Link
            className={classNames(s.linkItem, {[s.dark]: theme === 'dark', [s.active]: activeMenuIndex === index})}
            type="link"
            to={to}
            onClick={() => {setActiveMenuIndex(index);}}
        >
            {linkText}
        </Link>
    );
};