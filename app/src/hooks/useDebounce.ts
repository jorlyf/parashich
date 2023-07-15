import React from "react";

const useDebounce = (callback: (...args: any) => void, msDelay: number = 250) => {

  const timeout = React.useRef<NodeJS.Timeout>(null);

  const debouncedCallback = React.useCallback((...args: any) => {

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => callback(...args), msDelay);

  }, [callback, msDelay]);

  return debouncedCallback;
}

export default useDebounce;
