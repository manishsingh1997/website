import React from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import UnknownErrorPage from '../UnknownErrorPage';

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError() {
    return {hasError: true};
  }

  static propTypes = {
    children: PropTypes.node,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error) {
    Sentry.captureException(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <UnknownErrorPage/>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;