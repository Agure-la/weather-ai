import { FiAlertCircle } from 'react-icons/fi'

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
      <FiAlertCircle className="mt-0.5 shrink-0 text-rose-400" />
      <p>{message}</p>
    </div>
  )
}
