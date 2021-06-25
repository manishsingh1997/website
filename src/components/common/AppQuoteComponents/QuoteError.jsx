import React from 'react';
import PropTypes from 'prop-types';

import {Notification} from '@ergeon/core-components';

import {HTTP_STATUS_NOT_FOUND} from 'website/constants';
import NotFoundPage from 'components/NotFoundPage';

export default class QuoteError extends React.Component {

  static propTypes = {
    quoteError: PropTypes.shape({
      statusCode: PropTypes.number,
      data: PropTypes.object,
    }),
  };

  render() {
    const {statusCode, data} = this.props.quoteError;

    if (statusCode === HTTP_STATUS_NOT_FOUND) {
      return <NotFoundPage/>;
    }

    let error = '';
    if (data && data.detail) {
      error = {detail: error};
    }

    return (
      <Notification mode="embed" type="Error" >
        There was an error trying to retrieve quote.<br />
        {error}
      </Notification>
    );
  }
}
