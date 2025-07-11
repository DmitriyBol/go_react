import s from './navigateButton.module.scss';
import useZusStore from '../../store.ts';
import classNames from 'classnames';
import {Link} from 'react-router';

export type NavigateButtonPropsType = {
    linkText: string;
    to: string;
}

export const NavigateButton = (
    {linkText, to}: NavigateButtonPropsType
) => {
    const {theme} = useZusStore();

    return (
        <Link
            className={classNames(s.linkItem, {[s.dark]: theme === 'dark'})}
            type="link"
            to={to}
        >
            {linkText}
        </Link>
    );
};