import { useState } from 'react';
import TaskForm from './TaskForm.jsx';

const CATEGORY_STYLES = {
  trabalho: 'bg-trabalho/10 text-trabalho border-trabalho/30',
  estudos: 'bg-estudos/10 text-estudos border-estudos/30',
  pessoal: 'bg-pessoal/10 text-pessoal border-pessoal/30',
};

const CATEGORY_LABELS = {
  trabalho: 'Trabalho',
  estudos: 'Estudos',
  pessoal: 'Pessoal',
};

export default function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <TaskForm
        initialTask={task}
        onCancel={() => setEditing(false)}
        onSubmit={(data) => {
          onUpdate(task.id, data);
          setEditing(false);
        }}
      />
    );
  }

  return (
    <div className="flex items-start gap-3 bg-white border border-ink/10 rounded-lg p-4">
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task)}
        className="mt-1 h-4 w-4 accent-ink cursor-pointer"
      />

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium ${task.done ? 'line-through text-ink/40' : ''}`}>
          {task.title}
        </p>
        {task.description && (
          <p className={`text-sm text-ink/60 mt-0.5 ${task.done ? 'line-through' : ''}`}>
            {task.description}
          </p>
        )}
        <span
          className={`inline-block mt-2 text-xs font-medium border rounded-full px-2 py-0.5 ${CATEGORY_STYLES[task.category]}`}
        >
          {CATEGORY_LABELS[task.category]}
        </span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => setEditing(true)}
          className="text-xs text-ink/50 hover:text-ink px-2 py-1"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-red-500/70 hover:text-red-600 px-2 py-1"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
