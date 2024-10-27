import { useEffect, useRef } from "react";

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [document.title, title]);
};
const useDebounce = (fn: (...args: any[]) => void, ms: number) => {
  const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);

  return (...args: any[]) => {
    clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      fn(...args);
    }, ms);
  };
};

export { useTitle, useDebounce };
