import { useEffect, useRef, useState } from "react";

const useThrottle = <T>(value: T, delay = 500): T => {
  const [throttledValue, setThrottledValue] = useState(value);
  const available = useRef(true);

  useEffect(() => {
    if (available.current) {
      console.log(value, available.current);
      available.current = false;
      setThrottledValue(value);
      setTimeout(() => (available.current = true), delay);
    }
  }, [value, delay]);

  return throttledValue;
};

export default useThrottle;
