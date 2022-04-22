import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './AppSubCard.scss';

export default class AppSubCard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    renderContent: PropTypes.func.isRequired,
    renderHeader: PropTypes.func.isRequired,
  };

  render() {
    const {className, renderHeader, renderContent} = this.props;

    const subCardClassNames = classNames({
      'app-subcard': true,
      card: true,
      shadow: true,
      border: true,
      'padding-20': true,
      spacing: true,
      'before__is-12': true,
      [className]: !!className,
    });

    return (
      <div className={subCardClassNames}>
        <h6 className="flex-row align-center">{renderHeader()}</h6>
        {renderContent()}
      </div>
    );
  }
}
