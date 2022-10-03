import React, {useMemo} from 'react';

import {ContractBlockProps} from './types';

const ContractBlock = ({contractUrl, quoteType}: ContractBlockProps) => {
  const isDriveWay = useMemo(() => /driveway/gi.test(quoteType), [quoteType]);
  const quoteLink = useMemo(() => `Read Project Contract ${isDriveWay ? '' : 'and Warranty'} here`, [isDriveWay]);
  return (
    <>
      {contractUrl && (
        <>
          <hr className="gray-line restricted-720" />
          <a href={contractUrl}>{quoteLink}</a>
        </>
      )}
    </>
  );
};

export default ContractBlock;
