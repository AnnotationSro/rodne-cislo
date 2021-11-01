import { useEffect, useState } from "react";

export function useDelayed<T>(defaultValue: T, timeout: number = 1_000) {
  const [val, setVal] = useState<T>();
  let oldTimeout: number | null = null;

  useEffect(() => {
    if (val !== defaultValue) {
      // @ts-ignore
      clearTimeout(oldTimeout);
      setTimeout(() => {
        setVal(defaultValue);
      }, timeout);
    }
    return () => {
      // @ts-ignore
      clearTimeout(oldTimeout);
    };
  }, [val]);

  return [val, setVal];
}
