import { useEffect, useMemo, useState } from 'react';

export default function useTimer() {
  const initialTime = 3 * 60 * 1000; // 3 minutes in milliseconds
  const [State, setState] = useState({ time: initialTime, isFinished: false });

  const resetTimer = () => {
    setState({ time: initialTime, isFinished: false });
  };

  useEffect(() => {
    const interval = setInterval(
      () => setState(p => ({ ...p, time: p.time - 1000 })),
      1000,
    );
    if (State.time === 0) {
      setState(p => ({ ...p, isFinished: true }));
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [State.time]);

  const time = useMemo(() => {
    const minutes = Math.floor(State.time / 60000);
    const seconds = ((State.time % 60000) / 1000).toFixed(0);
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }, [State.time]);

  return { ...State, time: time, resetTimer };
}
