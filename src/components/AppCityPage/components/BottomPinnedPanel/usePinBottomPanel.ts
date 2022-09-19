import {useMemo, RefObject} from 'react';

const usePinBottomPanel = (scrollPosition: number, elementRef: RefObject<HTMLElement>) => {
  const isPinned = useMemo(() => {
    const offsetTop = elementRef.current?.offsetTop ?? 0;
    const offsetHeight = elementRef.current?.offsetHeight ?? 0;
    const offset = offsetTop + offsetHeight;
    const extraHeight = 80;

    return !!offset && scrollPosition > offset - extraHeight;
  }, [scrollPosition, elementRef]);

  return isPinned;
};

export default usePinBottomPanel;
