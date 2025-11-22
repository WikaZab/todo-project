import TaskList from 'app/TodoListPage/TodoList/TodoList';
import { useNavigate } from 'react-router';
import { HeaderCalendar } from 'app/HeaderTodo/HeaderTodo';
import { useState } from 'react';
import { Calendar } from 'app/TodoListPage/Calendar/Calendar';
import * as cls from './TodoListPage.module.scss';

export type ViewType = 'list' | 'calendar';

const TodoListPage = () => {
    const [view, setView] = useState<ViewType>('list');
    const handleViewMode = (newView: ViewType) => {
        setView(newView);
    };
    return (
        <div>
            <div className={cls.app}>
                <header className={cls.header}>
                    <div className={cls.title}>
                        <h1>TODO List</h1>
                    </div>
                    <div>
                        <HeaderCalendar view={view} handleViewMode={handleViewMode} />
                    </div>
                </header>

                {view === 'list' ? (
                    <main className={cls.main}>
                        <div className={cls.section}>
                            <TaskList />
                        </div>
                    </main>
                ) : (
                    <main className={cls.main}>
                        <div className={cls.section}>
                            <Calendar />
                        </div>
                    </main>
                )}

            </div>
        </div>
    );
};

export default TodoListPage;
