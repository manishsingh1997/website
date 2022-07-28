import React from 'react';
import {Button} from '@ergeon/core-components';
import {showUpcomingFeatures} from '../../utils/utils';
import {PageHeaderProps} from './types';

const PageHeader = (props: PageHeaderProps) => {
  const {onAdd} = props;
  return (
    <>
      <span>Addresses</span>
      {showUpcomingFeatures('ENG-16567') && (
        <Button onClick={onAdd} size="small">
          Add address
        </Button>
      )}
    </>
  );
};

export default PageHeader;
