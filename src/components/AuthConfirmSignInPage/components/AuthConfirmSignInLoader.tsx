import React, {FC} from 'react';

import {Spinner} from '@ergeon/core-components';

const AuthConfirmSignInLoader: FC = ({children}) => {
  return (
    <div className="center">
      <h4 className="center spacing after__is-24">{children}</h4>
      <Spinner active borderWidth={0.1} color="blue" size={48} />
    </div>
  );
};

export default AuthConfirmSignInLoader;
