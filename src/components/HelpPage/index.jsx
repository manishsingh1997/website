import React from 'react';

import {HelpPage as Help} from '@ergeon/help-components';

import helpDefaultCategories from 'data/help-categories';
import {HELP_DOMAIN_ID} from 'website/constants';
import config from 'website/config';

const HelpPage = (props) => {
  return (
    <Help
      apiHost={config.apiHost}
      categories={helpDefaultCategories}
      domain={HELP_DOMAIN_ID}
      {...props} />
  );
};

export default HelpPage;
