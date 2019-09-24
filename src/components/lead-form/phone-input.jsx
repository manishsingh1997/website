import React from 'react';
import PropTypes from 'prop-types';
import vanillaTextMask from 'vanilla-text-mask';

const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

import './floating-input.scss';
export default class FloatingPhoneInput extends React.Component {
  static propTypes = {
    labelName: PropTypes.func,
    name: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.func,
    value: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  componentDidMount() {
    this.maskedInputController = vanillaTextMask({
      inputElement: this.input,
      mask: phoneMask,
    });
  }

  componentWillUnmount() {
    this.maskedInputController.destroy();
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({value});
    this.props.onChange(this.props.name, value);
  };

  render() {
    return (
      <div className={`float-container ${!!this.props.value && 'is-hasValue'}`}>
        <input
          id={this.props.name}
          onKeyUp={this.handleInputChange}
          placeholder={this.props.placeholder}
          ref={input => this.input = input}
          type="phone"
          value={this.state.value} />
        <label htmlFor={this.props.name}>{this.props.labelName}</label>
      </div>
    );
  }
}

