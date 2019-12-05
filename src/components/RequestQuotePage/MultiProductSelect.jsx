import React from 'react';
import PropTypes from 'prop-types';
import Select, {components} from 'react-select';
import {products} from 'libs/constants';
import DropdownImg from 'assets/drop_down.svg';
import ClearImg from 'assets/cross.svg';

import './MultiProductSelect.scss';

const options = products.map(function(productItem) {
  return {value: productItem.slug, label: productItem.name};
});

const DropdownIndicator = (props) => {
  return components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>
      <img
        height="7"
        src={DropdownImg}
        width="24" />
    </components.DropdownIndicator>
  );
};

const ClearIndicator = (props) => {
  return components.ClearIndicator && (
    <components.ClearIndicator {...props}>
      <img
        height="10"
        src={ClearImg}
        width="24" />
    </components.ClearIndicator>
  );
};

export default class MultiProductSelect extends React.Component {
    static propTypes = {
      isMulti: PropTypes.bool,
      name: PropTypes.string,
      onChange: PropTypes.func,
      value: PropTypes.string,
    };

    state = {
      selectedOption: this.props.value,
    };

    handleChange = (selectedOption) => {
      let productDataForLead;
      this.setState({selectedOption});

      if (this.props.isMulti === true) {
        productDataForLead = selectedOption.map(function(item) {
          return item.value;
        });
        if (productDataForLead.length === 1) {
          productDataForLead = productDataForLead[0];
        }
      } else {
        productDataForLead = selectedOption.value;
      }

      this.props.onChange(this.props.name, productDataForLead);

    };

    render() {
      const {selectedOption} = this.state;

      return (
        <Select
          className="react-select-container"
          classNamePrefix="react-select"
          components={{DropdownIndicator, ClearIndicator}}
          isMulti={this.props.isMulti}
          isSearchable={false}
          name={this.props.name}
          onChange={this.handleChange}
          options={options}
          placeholder={'Select services…'}
          value={selectedOption} />
      );
    }
}
