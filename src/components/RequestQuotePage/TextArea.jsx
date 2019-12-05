import React from 'react';
import PropTypes from 'prop-types';

import './TextArea.scss';

export default class TextArea extends React.Component {
  static propTypes = {
    labelName: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  handleInputChange = (event) => {
    const value = event.target.value;
    this.setState({value});
    this.props.onChange(this.props.name, value);
  };

  render() {
    return (
      <div className={`float-area-container ${!!this.props.value && 'is-hasValue'}`}>
        <textarea
          cols="50"
          id={this.props.name}
          onChange={this.handleInputChange}
          placeholder={this.props.placeholder}
          rows="2"
          type="text"
          value={this.state.value} />
        <label htmlFor={this.props.name}>{this.props.labelName}</label>
      </div>
    );
  }
}
