import React from 'react';
import PropTypes from 'prop-types';

import {Button} from '@ergeon/core-components';

import './TextCollapse.scss';
export default class TextCollapse extends React.Component {
  static propTypes = {
    children: PropTypes.string,
    length: PropTypes.number,
  };

  static defaultProps = {
    length: 42,
    children: '',
  };

  state = {
    expanded: false,
  };

  renderCollapsed() {
    const {children, length} = this.props;
    const collapsedText = children.slice(0, length);
    return (
      <React.Fragment>
        {collapsedText}...
        <Button
          className="text-collapse__button"
          flavor="primary"
          onClick={() => this.setState({expanded: true})}
          taste="boundless">
          Show more
        </Button>
      </React.Fragment>
    );
  }

  renderExpanded() {
    const {children} = this.props;
    return (
      <React.Fragment>
        {children}
        <Button
          className="text-collapse__button"
          flavor="primary"
          onClick={() => this.setState({expanded: false})}
          taste="boundless">
          Show less
        </Button>
      </React.Fragment>
    );
  }

  render() {
    const {children, length} = this.props;
    const {expanded} = this.state;

    return (
      <div className="text-collapse">
        {(expanded || children.length <= length) ? this.renderExpanded() : this.renderCollapsed()}
      </div>
    );
  }
}