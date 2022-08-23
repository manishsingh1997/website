import {useCallback} from 'react';

// eslint-disable-next-line import/named
import scrollTo, {IUserOptions} from 'animated-scroll-to';

import {TOP_PANEL_HEIGHT} from '../../website/constants';

const useScrollToElement = (elementOffsetTop = 0, scrollOptions?: IUserOptions) => {
  const scrollToElement = useCallback(() => {
    const OffsetTop = elementOffsetTop - TOP_PANEL_HEIGHT;

    return scrollTo(OffsetTop, scrollOptions);
  }, [elementOffsetTop, scrollOptions]);

  return {
    scrollToElement,
  };
};

export default useScrollToElement;
