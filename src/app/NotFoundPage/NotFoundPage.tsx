import React from 'react';
import { Link } from 'react-router-dom';
import cls from 'app/NotFoundPage/notFoundPage.module.scss';

export const NotFoundPage = () => (
    <div className={cls.nodFoundPage}>
        <div className="not-found-content">
            <div className="not-found-icon">⚠️</div>
            <h1 className="not-found-title">404</h1>
            <h2>Страница не найдена</h2>
            <p>К сожалению, мы не можем найти запрашиваемую страницу.</p>
            <div className="not-found-actions">
                <Link to="/" className="not-found-button primary">
                    На главную
                </Link>
                <button type="button" onClick={() => window.history.back()} className="not-found-button secondary">
                    Назад
                </button>
            </div>
        </div>
    </div>
);

export default NotFoundPage;
