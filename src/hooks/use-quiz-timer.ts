import { useRef, useState, useEffect, useCallback } from 'react';

export interface QuizTimerOptions {
  /** Auto-start timer when hook is initialized */
  autoStart?: boolean;
  /** Maximum time limit in seconds (0 = no limit) */
  timeLimit?: number;
  /** Interval for timer updates in milliseconds */
  interval?: number;
  /** Callback when time limit is reached */
  onTimeUp?: () => void;
  /** Callback on each timer tick */
  onTick?: (elapsedSeconds: number, remainingSeconds: number) => void;
}

export interface QuizTimerReturn {
  /** Elapsed time in seconds */
  elapsedSeconds: number;
  /** Remaining time in seconds (only when timeLimit is set) */
  remainingSeconds: number;
  /** Whether the timer is currently running */
  isRunning: boolean;
  /** Whether time is up (only when timeLimit is set) */
  isTimeUp: boolean;
  /** Start the timer */
  start: () => void;
  /** Pause the timer */
  pause: () => void;
  /** Stop the timer and reset to 0 */
  stop: () => void;
  /** Reset the timer to 0 without stopping */
  reset: () => void;
  /** Resume the timer from current position */
  resume: () => void;
}

export function useQuizTimer(options: QuizTimerOptions = {}): QuizTimerReturn {
  const { autoStart = false, timeLimit = 0, interval = 1000, onTimeUp, onTick } = options;

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);

  const remainingSeconds = timeLimit > 0 ? Math.max(0, timeLimit - elapsedSeconds) : 0;
  const isTimeUp = timeLimit > 0 && elapsedSeconds >= timeLimit;

  const updateTimer = useCallback(() => {
    if (startTimeRef.current) {
      const now = Date.now();
      const newElapsedSeconds = Math.floor(
        (now - startTimeRef.current + pausedTimeRef.current) / 1000
      );
      setElapsedSeconds(newElapsedSeconds);

      // Check if time limit is reached
      if (timeLimit > 0 && newElapsedSeconds >= timeLimit) {
        setIsRunning(false);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        onTimeUp?.();
      }

      // Call onTick callback
      const remaining = timeLimit > 0 ? Math.max(0, timeLimit - newElapsedSeconds) : 0;
      onTick?.(newElapsedSeconds, remaining);
    }
  }, [timeLimit, onTimeUp, onTick]);

  const start = useCallback(() => {
    if (!isRunning) {
      startTimeRef.current = Date.now();
      pausedTimeRef.current = 0;
      setElapsedSeconds(0);
      setIsRunning(true);
    }
  }, [isRunning]);

  const pause = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (startTimeRef.current) {
        pausedTimeRef.current += Date.now() - startTimeRef.current;
      }
    }
  }, [isRunning]);

  const resume = useCallback(() => {
    if (!isRunning && !isTimeUp) {
      startTimeRef.current = Date.now();
      setIsRunning(true);
    }
  }, [isRunning, isTimeUp]);

  const stop = useCallback(() => {
    setIsRunning(false);
    setElapsedSeconds(0);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    setElapsedSeconds(0);
    pausedTimeRef.current = 0;
    if (isRunning) {
      startTimeRef.current = Date.now();
    }
  }, [isRunning]);

  // Handle timer interval
  useEffect(() => {
    if (isRunning && !isTimeUp) {
      intervalRef.current = setInterval(updateTimer, interval);
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, isTimeUp, updateTimer, interval]);

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart) {
      start();
    }
  }, [autoStart, start]);

  // Cleanup on unmount
  useEffect(
    () => () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    },
    []
  );

  return {
    elapsedSeconds,
    remainingSeconds,
    isRunning,
    isTimeUp,
    start,
    pause,
    stop,
    reset,
    resume,
  };
}
