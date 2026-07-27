import { useState, useEffect } from 'react';

export function useTypingEffect(text, speed = 50, delay = 0) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let timeout;
    let index = 0;
    let interval;

    timeout = setTimeout(() => {
      interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return { displayedText };
}
