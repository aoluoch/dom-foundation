/* oxlint-disable react/set-state-in-effect, react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'

interface AsyncState<T> {
  data: T | undefined
  loading: boolean
  error: Error | undefined
}

export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ data: undefined, loading: true, error: undefined })

  useEffect(() => {
    let active = true
    setState({ data: undefined, loading: true, error: undefined })
    fn()
      .then((data) => {
        if (active) setState({ data, loading: false, error: undefined })
      })
      .catch((error: Error) => {
        if (active) setState({ data: undefined, loading: false, error })
      })
    return () => {
      active = false
    }
  }, deps) // oxlint-disable-line react-hooks/exhaustive-deps

  return state
}
