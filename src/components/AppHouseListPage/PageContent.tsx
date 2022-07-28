import React from 'react';
import {Notification} from '@ergeon/core-components';

import HouseCard from './HouseCard';
import {PageContentProps} from './types';

const PageContent = (props: PageContentProps) => {
  const {houses, onEdit, onRemove} = props;

  if (!houses || !houses.length) {
    return (
      <Notification mode="embed" type="Information">
        There are no houses associated with your account yet.
      </Notification>
    );
  }
  return (
    <div className="house-list-page-wrapper">
      {houses.map((house) => (
        <HouseCard house={house} key={`house-${house.id}`} onEdit={onEdit} onRemove={onRemove} />
      ))}
    </div>
  );
};

export default PageContent;
