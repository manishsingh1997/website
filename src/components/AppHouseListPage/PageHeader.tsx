import React from 'react';
import {Button} from '@ergeon/core-components';
import {PageHeaderProps} from './types';

const PageHeader = (props: PageHeaderProps) => {
  const {onAdd} = props;
  return (
    <>
      <span>Addresses</span>
      <Button onClick={onAdd} size="small">
        Add address
      </Button>
    </>
  );
};

export default PageHeader;
