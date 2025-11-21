import React, { memo } from 'react';
import { useTheme } from 'app/providers/themeProvider/useTheme';
import { Theme } from 'app/providers/themeProvider/ThemeContext';
import NormalIcon from 'components/assets/sun.svg';
import DarkIcon from 'components/assets/moon.svg';
import * as cls from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = memo(() => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div>
            <button className={cls.Button} type="button" onClick={toggleTheme}>
                {theme === Theme.NORMAL ? <NormalIcon /> : <DarkIcon />}
            </button>
        </div>
    );
});
