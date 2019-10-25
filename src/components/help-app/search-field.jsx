import React from 'react';
import PropTypes from 'prop-types';

import {Button} from '@ergeon/core-components';

import './search-field.scss';
class SearchField extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    value: PropTypes.string,
  };

  state = {
    value: '',
  };

  getValue() {
    return this.props.value !== undefined ? this.props.value : this.state.value;
  }

  onChange(event) {
    const value = event.target.value;
    this.setState({value});

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.getValue());
  }

  render() {
    const value = this.getValue();

    return (
      <form className="search-field" onSubmit={this.onSubmit.bind(this)}>
        <i className="search-field__icon" />
        <input
          className="search-field__input"
          onChange={this.onChange.bind(this)}
          placeholder="Search..."
          value={value} />
        <Button className="search-field__button">
          Go
        </Button>
      </form>
    );
  }
}

export default SearchField;