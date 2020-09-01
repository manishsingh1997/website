import React from 'react';
import PropTypes from 'prop-types';
import vanillaTextMask from 'vanilla-text-mask';
import {Input} from '@ergeon/core-components';

// TODO: Move PhoneInput to erg-core-components
const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

export default class PhoneInput extends React.Component {
  static propTypes = {
    disabled: PropTypes.bool,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    valid: PropTypes.bool,
    value: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {value: props.value || ''};
  }
  componentDidMount() {
    this.maskedInputController = vanillaTextMask({
      inputElement: document.getElementById(this.props.name),
      mask: phoneMask,
    });
  }
  componentWillUnmount() {
    if (this.maskedInputController) this.maskedInputController.destroy();
  }
  handleInputChange = (e, name, value) => {
    this.setState({value});
    this.props.onChange(e, name, value);
  };
  render() {
    const {disabled, label, name, placeholder, valid} = this.props;
    return (
      <Input
        disabled={disabled}
        label={label}
        name={name}
        onKeyUp={this.handleInputChange}
        placeholder={placeholder}
        valid={valid}
        value={this.state.value} />
    );
  }
}

