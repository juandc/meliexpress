import { renderHook, act, waitFor } from '@testing-library/react';
import { useWritingPlaceholder } from './useWritingPlaceholder';

jest.useFakeTimers();

describe('useWritingPlaceholder', () => {
  it('should return the initial character of the first sentence', async () => {
    const { result } = renderHook(() => useWritingPlaceholder({
      placeholders: ['Hello', 'World'],
      shouldMove: true,
      speed: 1,
    }));

    expect(result.current).toBe('');
    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('H');
  });

  it('should update the character index over time', async () => {
    const { result } = renderHook(() => useWritingPlaceholder({
      placeholders: ['Hello', 'World'],
      shouldMove: true,
      speed: 1,
    }));

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    await waitFor(() => expect(result.current).toBe('H'));

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    await waitFor(() => expect(result.current).toBe('He'));

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    await waitFor(() => expect(result.current).toBe('Hel'));

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    await waitFor(() => expect(result.current).toBe('Hell'));

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    await waitFor(() => expect(result.current).toBe('Hello'));
  });

  it('should move to the next sentence after the final sentence wait', async () => {
    const { result } = renderHook(() => useWritingPlaceholder({
      placeholders: ['Hello', 'World'],
      shouldMove: true,
      speed: 1,
      finalSentenceWait: 1,
    }));

    await act(async () => {
      jest.advanceTimersByTime(5);
    });
    await waitFor(() => expect(result.current).toBe('Hello'));

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    await waitFor(() => expect(result.current).toBe(''));

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    await waitFor(() => expect(result.current).toBe('W'));
  });
});
