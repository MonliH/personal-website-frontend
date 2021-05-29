import { MutableRefObject, useRef, useEffect } from "react";

const useInterval = (
  callback: () => void,
  delay: number
): MutableRefObject<number> => {
  const intervalRef = useRef(0);
  const callbackRef = useRef(callback);

  // Remember the latest callback:
  //
  // Without this, if you change the callback, when setInterval ticks again, it
  // will still call your old callback.
  //
  // If you add `callback` to useEffect's deps, it will work fine but the
  // interval will be reset.

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the interval:
  useEffect((): (() => void) => {
    intervalRef.current = window.setInterval(
      () => callbackRef.current(),
      delay
    );

    // Clear interval if the components is unmounted or the delay changes:
    return () => window.clearInterval(intervalRef.current);
  }, [delay]);

  // Returns a ref to the interval ID in case you want to clear it manually:
  return intervalRef;
};

export default useInterval;
