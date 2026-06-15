import { Component, type ErrorInfo, type ReactNode } from 'react'
import ErrorMessage from './ui/ErrorMessage'

interface Props {
  children: ReactNode
  fallbackTitle?: string
}

interface State {
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('UI error:', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <h2 className="mb-2 text-lg font-semibold text-white">
            {this.props.fallbackTitle ?? 'Something went wrong'}
          </h2>
          <ErrorMessage message={this.state.error.message} />
          <button
            type="button"
            onClick={() => this.setState({ error: null })}
            className="mt-4 rounded-xl bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
          >
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
