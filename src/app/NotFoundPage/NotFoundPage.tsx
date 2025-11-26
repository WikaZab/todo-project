import React from 'react';
import { Link } from 'react-router-dom';
import * as cls from 'app/NotFoundPage/notFoundPage.module.scss';

export const NotFoundPage = () => (
    <div className={cls.notFoundPage}>
        <div className={cls.content}>
            <h1 className={cls.title}>404</h1>
            <h2 className={cls.subtitle}>Страница не найдена</h2>
            <div className={cls.actions}>
                <Link to="/" className={cls.link}>
                    На главную
                </Link>
                <button
                    type="button"
                    onClick={() => window.history.back()}
                    className={cls.btn}
                >
                    Назад
                </button>
            </div>
        </div>
    </div>
);

export default NotFoundPage;
