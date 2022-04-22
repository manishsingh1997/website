import { useState, useEffect } from 'react';

const SCREEN_SM = 768;

export const getCssPxValue = (property: string) => {
  const cssVal = getComputedStyle(document.body).getPropertyValue(property);
  if (cssVal) {
    return Number(cssVal.replace('px', ''));
  }
  console.warn(`Cannot extract css of ${property}`);
}

/**
 * Custom hook that checks `window.innerWidth` for resolutions less than or equal to screen SM.
 * @returns {Boolean}
 */
export const useIsMobileWidth = (): boolean => {
  const [isMobileWidth, setIsMobileWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileWidth(window.innerWidth <= (getCssPxValue('--screen-sm') || SCREEN_SM));
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobileWidth;
}
