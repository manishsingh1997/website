import React from 'react';
import PropTypes from 'prop-types';

import './DataRow.scss';

const DataRow = ({title, value, defaultValue='-'}) => {

  return (
    <div className="customer-app-data-row">
      <div>{title}</div>
      <div>{value || defaultValue}</div>
    </div>
  );
};

DataRow.propTypes = {
  defaultValue: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default DataRow;
