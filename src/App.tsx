import React from 'react';
import './styles/index.scss';
import { useTheme } from 'app/providers/themeProvider/useTheme';
import AppRouter from 'app/providers/router/AppRouter';
import { ThemeSwitcher } from 'components/ThemeSwitcher/ThemeSwitcher';

const App = () => {
// хук по переключению темы
    const { theme, toggleTheme } = useTheme();
    return (
        <div className={`app ${theme}`}>
            <div className="switcher">
                <ThemeSwitcher />
            </div>
            <AppRouter />
        </div>

    );
};
export default App;
