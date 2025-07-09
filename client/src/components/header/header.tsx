import s from './header.module.scss';

export const Header = ({
    changeTheme,
    theme,
}: {
  changeTheme: () => void;
  theme: 'light' | 'dark';
}) => {
    const isLightTheme = theme === 'light';

    return (
        <header className={`${s.wrap} ${isLightTheme ? s.light : s.dark}`}>
            <button className={s.themeButton} type="button" onClick={changeTheme}>
                {isLightTheme ? '○' : '●'}
            </button>
        </header>
    );
};
