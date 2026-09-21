import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './context/AuthContext.jsx';
import { tasksApi } from './api/client.js';
import AuthForm from './components/AuthForm.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';

export default function App() {
  const { token, user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('todas');
  const [error, setError] = useState('');

  const loadTasks = useCallback(async () => {
    if (!token) return;
    try {
      const category = filter === 'todas' ? undefined : filter;
      const data = await tasksApi.list(token, category);
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  }, [token, filter]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  if (!token) return <AuthForm />;

  const handleCreate = async (data) => {
    try {
      await tasksApi.create(token, data);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, data) => {
    try {
      await tasksApi.update(token, id, data);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (task) => {
    try {
      await tasksApi.update(token, task.id, { done: !task.done });
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await tasksApi.remove(token, id);
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="border-b border-ink/10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Minhas tarefas</h1>
            <p className="text-xs text-ink/50">Olá, {user?.name}</p>
          </div>
          <button
            onClick={logout}
            className="text-sm text-ink/50 hover:text-ink"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <TaskForm onSubmit={handleCreate} />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <TaskList
          tasks={tasks}
          filter={filter}
          onFilterChange={setFilter}
          onToggle={handleToggle}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}
