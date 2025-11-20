import React from 'react';
import { Link } from 'react-router-dom';
import './styles/index.scss';
import { useTheme } from 'app/providers/theme/useTheme';
import AppRouter from 'app/providers/router/AppRouter';
import { ThemeSwitcher } from 'components/ThemeSwitcher/ThemeSwitcher';

const App = () => {
// хук по переключению темы
    const { theme, toggleTheme } = useTheme();
    return (
        <div className={`app ${theme}`}>
            <ThemeSwitcher />
            <Link to="/">Список задач</Link>
            <Link to="/edit/:id">Изменить задачу</Link>
            <Link to="/add">Добавить задачу</Link>
            <AppRouter />
        </div>

    );
};
export default App;
