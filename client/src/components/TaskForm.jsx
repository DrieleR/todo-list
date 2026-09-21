import { useState, useEffect } from 'react';

const CATEGORIAS = [
  { value: 'trabalho', label: 'Trabalho' },
  { value: 'estudos', label: 'Estudos' },
  { value: 'pessoal', label: 'Pessoal' },
];

export default function TaskForm({ initialTask, onSubmit, onCancel }) {
  const [form, setForm] = useState({ title: '', description: '', category: 'trabalho' });

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title,
        description: initialTask.description || '',
        category: initialTask.category,
      });
    }
  }, [initialTask]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-ink/10 rounded-lg p-4 space-y-3">
      <input
        name="title"
        placeholder="Título da tarefa"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full border border-ink/15 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ink/30"
      />
      <textarea
        name="description"
        placeholder="Descrição (opcional)"
        value={form.description}
        onChange={handleChange}
        rows={2}
        className="w-full border border-ink/15 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ink/30 resize-none"
      />
      <div className="flex items-center gap-2">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border border-ink/15 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ink/30"
        >
          {CATEGORIAS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <div className="flex-1" />

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm text-ink/60 hover:text-ink px-3 py-2"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit"
          className="bg-ink text-paper rounded-md px-4 py-2 text-sm font-medium"
        >
          {initialTask ? 'Salvar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );
}
