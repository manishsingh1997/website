import React from 'react';

import AppLoader from 'components/common/AppLoader';

const getDisplayName = (WrappedComponent)  => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

/**
 * A wrapper for React Component to load initial data.
 * It will:
 * - show loader while data is still fetching
 * - show error if data fetch failed
 * - render given Component if fetch succeeded.
 *
 * Arguments:
 * - fetchData - function, that should initiate data fetching
 * - isLoading - function, that should return true if data is still loading
 * - getError - function, that should return error of data fetching
 * - contextType - optional context provider (instace created with React.createContext())
 *
 * All argument's functions will receive component's props and context as params.
 */
const withDataLoader = ({fetchData, isLoading, getError, contextType}) => {

  return (WrappedComponent) => {

    class WithDataLoader extends React.Component {

      static displayName = `WithDataLoader(${getDisplayName(WrappedComponent)})`;

      componentDidMount() {
        fetchData(this.props, this.context);
      }

      static contextType = contextType;

      renderError(error) {
        console.warn(error);
        return (
          <div className="center error">
            <p>Something unexpected happened, we are already notified about this.</p>
            <p>Please try to reload the page.</p>
          </div>
        );
      }

      render() {
        if (isLoading(this.props, this.context)) {
          return <AppLoader />;
        }

        const error = getError(this.props, this.context);

        if (error) {
          return this.renderError(error);
        }

        return <WrappedComponent {...this.props} />;
      }

    }
    return WithDataLoader;
  };
};

export default withDataLoader;
