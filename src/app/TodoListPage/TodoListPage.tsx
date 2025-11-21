import TaskList from 'app/TodoListPage/TodoList/TodoList';
import CreateTask from 'app/AddTaskPage/AddTaskPage';
import * as cls from './TodoListPage.module.scss';

const TodoListPage = () => (
    <div>
        <div className={cls.app}>
            <header className={cls.header}>
                <h1>Список задач</h1>
                <CreateTask />
            </header>

            <main className={cls.main}>
                <div className="list-section">
                    <TaskList />
                </div>
            </main>
        </div>
    </div>
);
export default TodoListPage;
