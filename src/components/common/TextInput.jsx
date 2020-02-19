import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import './FloatingInput.scss';

export default class TextInput extends React.Component {
  static propTypes = {
    labelName: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {value: props.value || ''};
  }

    handleInputChange = (event) => {
      const value = event.target.value;
      this.setState({value});
      this.props.onChange(this.props.name, value);
    };

    render() {
      return (
        <div className={classNames('float-container', {'is-hasValue': this.props.value})}>
          <input
            id={this.props.name} onChange={this.handleInputChange}
            placeholder={this.props.placeholder}
            type="text"
            value={this.state.value} />
          <label htmlFor={this.props.name}>{this.props.labelName}</label>
        </div>
      );
    }
}
