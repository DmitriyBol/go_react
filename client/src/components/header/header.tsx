import s from './header.module.scss';
import {CustomButton, type CustomButtonPropsType} from '../customButton/customButton.tsx';
import classNames from 'classnames';
import {NavigateButton, type NavigateButtonPropsType} from '../navigateButton/navigateButton.tsx';
import useZusStore from '../../store.ts';

const LEFT_BUTTONS: CustomButtonPropsType[] = [
    {
        buttonText: 'Explore',
        isHighLight: true,
        onClick: () => {},
    },
    {
        buttonText: 'Login',
        isHighLight: false,
        onClick: () => {},
    }
];

const NAVIGATE_BUTTONS: NavigateButtonPropsType[] = [
    {
        linkText: 'Home',
        to: '/',
    },
    {
        linkText: 'Todos',
        to: '/todo',
    },
    {
        linkText: 'Products',
        to: '/products',
    },
];

export const Header = () => {
    const {theme, setTheme} = useZusStore();

    return (
        <header className={classNames(s.wrap, {[s.dark]: theme === 'dark'})}>
            <div className={s.headerWrap}>
                <nav className={s.navigateBar}>
                    {NAVIGATE_BUTTONS.map((btn) => {
                        return (
                            <NavigateButton
                                key={btn.linkText}
                                linkText={btn.linkText}
                                to={btn.to}
                            />
                        );
                    })}
                </nav>
                <div className={s.leftMenu}>
                    {LEFT_BUTTONS.map(btn => {
                        return (
                            <CustomButton
                                key={btn.buttonText}
                                buttonText={btn.buttonText}
                                isHighLight={btn.isHighLight}
                                onClick={btn.onClick}
                            />
                        );
                    })}
                    <CustomButton
                        buttonText={''}
                        isHighLight={false}
                        isThemeButton
                        onClick={setTheme}
                    />
                </div>
            </div>
        </header>
    );
};
