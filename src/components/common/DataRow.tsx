import React, { ReactNode } from 'react';

import './DataRow.scss';

type DataRowProps = {
  defaultValue?: string;
  title: string;
  value: ReactNode | string;
}

const DataRow = (props: DataRowProps) => {
  const {title, value, defaultValue = '-'} = props;
  return (
    <div className="customer-app-data-row">
      <div>{title}</div>
      <div>{value || defaultValue}</div>
    </div>
  );
};

export default DataRow;
