import { useEffect, useRef, useMemo } from 'react';

export default function useMountedState() {
  let isMounted = useRef(true);

  useEffect(() => {
    return () => isMounted.current = false;
  }, []);

  let state = useMemo(() => {
    return { isMounted: () => isMounted.current };
  }, []);

  return state;
}