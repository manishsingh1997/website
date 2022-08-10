import React, {useMemo, useState} from 'react';
import classNames from 'classnames';
import {useHidePanelOnScroll} from './hooks';

import './MobileBottomPanel.scss';

type MobileBottomPanelProps = {
  children?: React.ReactNode;
};

const MobileBottomPanel = (props: MobileBottomPanelProps) => {
  const {children} = props;
  const [showBottomPanel, setShowBottomPanel] = useState<boolean>(false);

  useHidePanelOnScroll({setShowBottomPanel});

  const bottomPanelClasses = useMemo(() => {
    return classNames('mobile-bottom-panel__content', {
      'is-visible': showBottomPanel,
    });
  }, [showBottomPanel]);

  return (
    <div className="mobile-bottom-panel__wrapper">
      <div className={bottomPanelClasses}>
        {children}
      </div>
    </div>
  );
};

export default MobileBottomPanel;
