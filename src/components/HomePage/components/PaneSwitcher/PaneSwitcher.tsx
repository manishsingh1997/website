import React, {ReactNode, useCallback, useMemo, useState} from 'react';
import classNames from 'classnames';
import get from 'lodash/get';

import './PaneSwitcher.scss';

type PaneSwitcherProps = {
  children: ReactNode,
  defaultPane?: number,
};

const MIN_TABS_TO_DISPLAY = 2;

const PaneSwitcher = (props: PaneSwitcherProps) => {
  const {defaultPane} = props;

  const [activeTab, setActiveTab] = useState(defaultPane ?? 0);
  const children = React.Children.toArray(props.children);
  const tabNames = useMemo(() => children.map(child => get(child, ['props', 'data-name'])), [children]);

  const getOnClick = useCallback((idx: number) => () => {
    setActiveTab(idx);
  }, []);

  return (
    <div className="panes spacing before__is-24">
      {tabNames.length >= MIN_TABS_TO_DISPLAY &&
        <div className="tab-switcher bottom-line spacing after__is-24">
          {tabNames.map((tabName, idx) => (
            <button
              className={classNames('tab', {active: idx === activeTab})}
              key={`tab-${idx}`}
              onClick={getOnClick(idx)}>
              {tabName}
            </button>
          ))}
        </div>
      }
      {children.map((pane, idx) => (
        <div className={classNames('pane', {active: idx === activeTab})} key={`content-${idx}`}>
          {pane}
        </div>
      ))}
    </div>
  );
};

export default PaneSwitcher;
