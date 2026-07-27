import { useState, useCallback, useEffect } from 'react';
import { getCommandResponse, getWelcome } from '../data/commands';

export function useTerminal(lang) {
  const [history, setHistory] = useState(() => getWelcome(lang).map(l => ({ input: '', output: l })));
  const [input, setInput] = useState('');
  const [isGameMode, setIsGameMode] = useState(false);

  useEffect(() => {
    setHistory(getWelcome(lang).map(l => ({ input: '', output: l })));
    setInput('');
    setIsGameMode(false);
  }, [lang]);

  const handleCommand = useCallback((cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (trimmed === 'game') {
      setIsGameMode(true);
      setHistory(prev => [...prev, { input: trimmed, output: getCommandResponse('game', lang) }]);
      setInput('');
      return;
    }

    const output = getCommandResponse(trimmed, lang);
    setHistory(prev => [...prev, { input: trimmed, output }]);
    setInput('');
  }, [lang]);

  const exitGame = useCallback(() => {
    setIsGameMode(false);
  }, []);

  return { history, input, setInput, isGameMode, handleCommand, exitGame };
}
