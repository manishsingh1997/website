import React, {useMemo, useState} from 'react';

import {Button} from '@ergeon/core-components';
import './TextCollapse.scss';

type TextCollapseProps = {
  children: string;
  length: number;
};

const TextCollapse = (props: TextCollapseProps) => {
  const {children = '', length = 42} = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const renderCollapsed = useMemo(() => {
    const collapsedText = children.slice(0, length);
    return (
      <React.Fragment>
        {collapsedText}...
        <Button
          className="text-collapse__button"
          flavor="primary"
          onClick={() => setIsExpanded(true)}
          taste="boundless"
        >
          Show more
        </Button>
      </React.Fragment>
    );
  }, [children, length]);

  const renderExpanded = useMemo(() => {
    return (
      <React.Fragment>
        {children}
        <Button
          className="text-collapse__button"
          flavor="primary"
          onClick={() => setIsExpanded(false)}
          taste="boundless"
        >
          Show less
        </Button>
      </React.Fragment>
    );
  }, [children]);

  return (
    <div className="text-collapse">{isExpanded || children.length <= length ? renderExpanded : renderCollapsed}</div>
  );
};

export default TextCollapse;
