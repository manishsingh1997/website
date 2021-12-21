import React from 'react';

import {HelpPage as Help} from '@ergeon/help-components';

import helpDefaultCategories from 'data/help-categories';
import {HELP_DOMAIN_ID} from 'website/constants';

const HelpPage = (props) => {
  return (
    <Help
      apiHost={process.env.API_HOST}
      categories={helpDefaultCategories}
      domain={HELP_DOMAIN_ID}
      {...props} />
  );
};

export default HelpPage;
