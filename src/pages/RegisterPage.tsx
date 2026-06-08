import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCloud, FiUser } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { formatError } from '../utils/weatherHelpers'

const fields = [
  { key: 'firstName', label: 'First name', type: 'text' },
  { key: 'lastName', label: 'Last name', type: 'text' },
  { key: 'username', label: 'Username', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'password', label: 'Password', type: 'password' },
] as const

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await register(form)
      navigate('/login')
    } catch (err) {
      setError(formatError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/30">
            <FiCloud className="text-2xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Create account</h1>
          <p className="mt-2 text-slate-400">Start tracking weather for your favorite cities</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
        >
          {error && (
            <div className="mb-4 rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          )}

          {fields.map(({ key, label, type }) => (
            <label key={key} className="mb-4 block">
              <span className="mb-2 block text-sm text-slate-300">{label}</span>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type={type}
                  required
                  placeholder={label}
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 py-3 pl-10 pr-4 text-white outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                />
              </div>
            </label>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 py-3 font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-cyan-400 hover:text-cyan-300">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}
