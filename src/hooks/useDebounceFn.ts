import { useRef } from "react";

const useDebounceFn = (fn: Function, delay = 500) => {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  return (...args: unknown[]) => {
    clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

export default useDebounceFn;
