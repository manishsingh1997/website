import React from 'react';

import PropTypes from 'prop-types';
import {HelpLandingPage as HelpLanding} from '@ergeon/help-components';

import helpDefaultCategories from 'data/help-categories';

import { ERGEON1_PHONE } from '../../website/constants';

const HelpLandingPage = (props) => {
  const subtitle = [
    'Feel free to ',
    <a data-track-call="true" href={`tel:${ERGEON1_PHONE}`} key="call-us-number">
      call us
    </a>,
    ' if you don’t find your answer here',
  ];

  return (
    <HelpLanding
      categories={helpDefaultCategories}
      isLargeIcons
      subtitle={subtitle}
      title="Help & Customer Service"
      {...props}
    />
  );
};

HelpLanding.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      icon: PropTypes.node,
      nodeId: PropTypes.string,
    })
  ),
  subtitle: PropTypes.node,
  title: PropTypes.string,
};

export default HelpLandingPage;
