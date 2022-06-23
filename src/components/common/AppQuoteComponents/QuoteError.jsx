import React from 'react';
import PropTypes from 'prop-types';

import {Notification} from '@ergeon/core-components';

import {HTTP_STATUS_NOT_FOUND} from 'website/constants';
import NotFoundPage from '../../../components/NotFoundPage';

export default class QuoteError extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    quoteError: PropTypes.shape({
      statusCode: PropTypes.number,
      data: PropTypes.object,
    }),
  };

  render() {
    const {title, description, quoteError} = this.props;

    if (quoteError?.statusCode === HTTP_STATUS_NOT_FOUND) {
      return <NotFoundPage />;
    }

    return (
      <Notification mode="embed" type="Error">
        <h6>{title || 'There was an error trying to retrieve quote.'}</h6>
        <br />
        {quoteError?.data?.detail || description}
      </Notification>
    );
  }
}
