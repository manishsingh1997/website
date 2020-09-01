import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

export default class MaskedTextInput extends React.Component {
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
    const inputProps = {...this.props};
    delete inputProps.labelName;

    return (
      <div className={classNames('float-container', {'is-hasValue': this.props.value})}>
        <InputMask {...inputProps} />
        <label htmlFor={this.props.name}>{this.props.labelName}</label>
      </div>
    );
  }
}
