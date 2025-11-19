import React, { Suspense, useContext, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { AddTask } from 'app/AddTask/AddTask';
import { UpdateTask } from 'app/UpdateTask/UpdateTask';
import TodoList from 'app/TodoList/TodoList';
import { useTheme } from 'components/theme/useTheme';

const App = () => {
// функция по переключению темы
    const { theme, toggleTheme } = useTheme();
    return (
        <div className={`app ${theme}`}>
            <button type="button" onClick={toggleTheme}>Theme</button>
            <Suspense fallback="">
                <Link to="/">Список задач</Link>
                <Link to="/edit/:id">Изменить задачу</Link>
                <Link to="/add">Добавить задачу</Link>

                <Routes>
                    <Route path="/" element={<TodoList />} />
                    <Route path="/add" element={<AddTask />} />
                    <Route path="/edit/:id" element={<UpdateTask />} />
                </Routes>
            </Suspense>
        </div>
    );
};
export default App;
