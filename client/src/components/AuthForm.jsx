import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthForm() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isLogin = mode === 'login';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-1">
          {isLogin ? 'Entrar' : 'Criar conta'}
        </h1>
        <p className="text-ink/60 mb-6 text-sm">
          {isLogin ? 'Acesse suas tarefas.' : 'Leva menos de um minuto.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <input
              name="name"
              type="text"
              placeholder="Nome"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-ink/15 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ink/30"
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-ink/15 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ink/30"
          />
          <input
            name="password"
            type="password"
            placeholder="Senha (mín. 6 caracteres)"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full border border-ink/15 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ink/30"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-paper rounded-md py-2 text-sm font-medium disabled:opacity-50"
          >
            {loading ? 'Aguarde...' : isLogin ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <button
          onClick={() => setMode(isLogin ? 'register' : 'login')}
          className="mt-4 text-sm text-ink/60 hover:text-ink underline underline-offset-2"
        >
          {isLogin ? 'Não tem conta? Criar uma' : 'Já tem conta? Entrar'}
        </button>
      </div>
    </div>
  );
}
