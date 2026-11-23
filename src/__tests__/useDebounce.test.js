import { renderHook, act } from '@testing-library/react'
import { useDebounce } from '../hooks/useDebounce'

describe('useDebounce', () => {
  it('delays the value update', () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } }
    )
    expect(result.current).toBe('a')

    rerender({ value: 'abc' })
    expect(result.current).toBe('a') // not yet updated
    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('abc')

    vi.useRealTimers()
  })
})
