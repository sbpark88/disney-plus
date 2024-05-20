import { useRef } from "react";

const useThrottleFn = (fn: Function, delay = 500) => {
  const available = useRef(true);

  return (...args: unknown[]) => {
    if (available.current) {
      available.current = false;
      fn(...args);
      setTimeout(() => {
        available.current = true;
      }, delay);
    }
  };
};

export default useThrottleFn;
