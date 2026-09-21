import { Router } from 'express';
import db from '../db/database.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();
const CATEGORIAS_VALIDAS = ['trabalho', 'estudos', 'pessoal'];

// Todas as rotas de tarefas exigem autenticação
router.use(authRequired);

// GET /tasks  (aceita ?category=trabalho para filtrar)
router.get('/', (req, res) => {
  const { category } = req.query;

  let tasks;
  if (category) {
    tasks = db
      .prepare('SELECT * FROM tasks WHERE user_id = ? AND category = ? ORDER BY created_at DESC')
      .all(req.userId, category);
  } else {
    tasks = db
      .prepare('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC')
      .all(req.userId);
  }

  res.json(tasks.map(formatTask));
});

// POST /tasks
router.post('/', (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !category) {
    return res.status(400).json({ error: 'Título e categoria são obrigatórios' });
  }
  if (!CATEGORIAS_VALIDAS.includes(category)) {
    return res.status(400).json({ error: `Categoria deve ser: ${CATEGORIAS_VALIDAS.join(', ')}` });
  }

  const result = db
    .prepare('INSERT INTO tasks (title, description, category, user_id) VALUES (?, ?, ?, ?)')
    .run(title, description || '', category, req.userId);

  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(formatTask(task));
});

// PUT /tasks/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, category, done } = req.body;

  const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?').get(id, req.userId);
  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
  if (category && !CATEGORIAS_VALIDAS.includes(category)) {
    return res.status(400).json({ error: `Categoria deve ser: ${CATEGORIAS_VALIDAS.join(', ')}` });
  }

  db.prepare(
    `UPDATE tasks SET title = ?, description = ?, category = ?, done = ? WHERE id = ? AND user_id = ?`
  ).run(
    title ?? task.title,
    description ?? task.description,
    category ?? task.category,
    done !== undefined ? (done ? 1 : 0) : task.done,
    id,
    req.userId
  );

  const updated = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  res.json(formatTask(updated));
});

// DELETE /tasks/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const task = db.prepare('SELECT * FROM tasks WHERE id = ? AND user_id = ?').get(id, req.userId);
  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }

  db.prepare('DELETE FROM tasks WHERE id = ? AND user_id = ?').run(id, req.userId);
  res.status(204).send();
});

function formatTask(task) {
  return { ...task, done: Boolean(task.done) };
}

export default router;
