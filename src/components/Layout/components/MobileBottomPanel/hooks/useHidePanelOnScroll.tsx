import {Dispatch, useEffect} from 'react';
import {SCROLL_LIMIT} from './constants';

type UseHidePanelOnScroll = {
  setShowBottomPanel: Dispatch<boolean>;
}
const useHidePanelOnScroll = ({setShowBottomPanel}: UseHidePanelOnScroll) => {
  useEffect(function showHideBottomPannelOnScroll() {
    const onPageScroll = () => {
      const shouldShowBottomPanel = (window.scrollY >= SCROLL_LIMIT);
      setShowBottomPanel(shouldShowBottomPanel);
    }

    window.addEventListener('scroll', onPageScroll);
    return () => window.removeEventListener('scroll', onPageScroll);
  }, []);
}

export default useHidePanelOnScroll;
