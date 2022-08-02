import {useState, useEffect} from 'react';

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', updatePosition);

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  const updatePosition = () => {
    setScrollPosition(window.scrollY);
  };

  return scrollPosition;
};

export default useScrollPosition;
