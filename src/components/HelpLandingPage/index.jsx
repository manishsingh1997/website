import React from 'react';
import PropTypes from 'prop-types';

import {HelpLandingPage as HelpLanding} from '@ergeon/help-components';
import {PHONE_NUMBER} from '@ergeon/core-components/src/constants';

import helpDefaultCategories from 'data/help-categories';

const HelpLandingPage = (props) => {
  const subtitle = [
    'Feel free to ',
    <a href={`tel:${PHONE_NUMBER}`} key="call-us-number">call us</a>,
    ' if you don’t find your answer here',
  ];

  return (
    <HelpLanding
      categories={helpDefaultCategories}
      subtitle={subtitle}
      title="Help & Customer Service"
      {...props}/>
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
