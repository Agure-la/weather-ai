import { Link, Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCloud, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute right-0 top-1/4 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg shadow-sky-500/25">
              <FiCloud className="text-lg text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide text-white">SkyWatch</p>
              <p className="text-xs text-slate-400">Smart Weather Alerts</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => logout()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6"
      >
        <Outlet />
      </motion.main>
    </div>
  )
}
