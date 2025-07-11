import classNames from 'classnames';
import {useCallback} from 'react';
import useZusStore from '../../store.ts';

import s from './customButton.module.scss';

export type CustomButtonPropsType = {
    buttonText: string;
    isHighLight: boolean;
    onClick?: () => void;
    isThemeButton?: boolean;
};

export const CustomButton = (
    {
        buttonText,
        isHighLight,
        onClick,
        isThemeButton
    }: CustomButtonPropsType
) => {
    const {theme} = useZusStore();
    const onClickHandler = useCallback(() => {
        if (onClick) onClick();
    }, [onClick]);

    if (isThemeButton) {
        return (
            <button
                className={classNames(s.themeButton, {[s.dark]: theme === 'dark'})}
                onClick={onClickHandler}
            >
                {theme ==='dark' ? '○' : '●'}
            </button>
        );
    }
    
    return (
        <button
            className={classNames(s.button, {[s.highLight]: isHighLight, [s.dark]: theme === 'dark'})}
            onClick={onClickHandler}
        >
            {buttonText}
        </button>);
};
