import React from 'react';

import {Spinner} from '@ergeon/core-components';

const AppLoader = () => {
  return (
    <div className="center">
      <Spinner active={true} borderWidth={0.1} color="blue" size={48} />
    </div>
  );
};

export default AppLoader;
