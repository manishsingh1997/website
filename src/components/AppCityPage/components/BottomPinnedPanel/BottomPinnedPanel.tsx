import React, {useMemo} from 'react';

import classNames from 'classnames';

import './BottomPinnedPanel.scss';

type BottomPinnedPanelProps = {
  children?: React.ReactNode;
  showBottomPanel: boolean;
};

const BottomPinnedPanel = (props: BottomPinnedPanelProps) => {
  const {children, showBottomPanel} = props;

  const bottomPanelClasses = useMemo(() => {
    return classNames('mobile-bottom-panel__content', {
      'is-visible': showBottomPanel,
    });
  }, [showBottomPanel]);

  return (
    <div className="mobile-bottom-panel__wrapper">
      <div className={bottomPanelClasses}>{children}</div>
    </div>
  );
};

export default BottomPinnedPanel;
