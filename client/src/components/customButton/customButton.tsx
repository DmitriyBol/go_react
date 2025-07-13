import classNames from 'classnames';
import React, {useCallback} from 'react';
import useZusStore from '../../store.ts';

import s from './customButton.module.scss';

export type CustomButtonPropsType = {
    buttonText: string;
    isHighLight: boolean;
    onClick?: (a?: React.MouseEvent) => void;
    isThemeButton?: boolean;
    disabled?: boolean;
};

export const CustomButton = (
    {
        buttonText,
        isHighLight,
        onClick,
        isThemeButton,
        disabled
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
            disabled={disabled}
            className={classNames(
                s.button, {
                    [s.highLight]: isHighLight,
                    [s.dark]: theme === 'dark',
                    [s.disabled]: disabled || false,
                })}
            onClick={onClickHandler}
        >
            {buttonText}
        </button>);
};
