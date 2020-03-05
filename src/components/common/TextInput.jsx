import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import './FloatingInput.scss';

export default class TextInput extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    labelName: PropTypes.string,
    name: PropTypes.string,
    onBlur: PropTypes.func,
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
      const classes = {
        'float-container': true,
        'is-hasValue': this.props.value,
        [this.props.className]: this.props.className,
      };

      return (
        <div className={classNames(classes)}>
          <input
            id={this.props.name}
            onBlur={this.props.onBlur}
            onChange={this.handleInputChange}
            placeholder={this.props.placeholder}
            type="text"
            value={this.state.value} />
          <label htmlFor={this.props.name}>{this.props.labelName}</label>
        </div>
      );
    }
}
