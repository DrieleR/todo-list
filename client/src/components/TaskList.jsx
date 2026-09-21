import TaskItem from './TaskItem.jsx';

const FILTROS = [
  { value: 'todas', label: 'Todas' },
  { value: 'trabalho', label: 'Trabalho' },
  { value: 'estudos', label: 'Estudos' },
  { value: 'pessoal', label: 'Pessoal' },
];

export default function TaskList({ tasks, filter, onFilterChange, onToggle, onUpdate, onDelete }) {
  return (
    <div>
      <div className="flex gap-2 mb-4 flex-wrap">
        {FILTROS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
              filter === f.value
                ? 'bg-ink text-paper border-ink'
                : 'border-ink/15 text-ink/60 hover:border-ink/30'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-ink/50 py-8 text-center">
          Nenhuma tarefa por aqui ainda.
        </p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
