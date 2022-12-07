import React, {useCallback, useEffect, useState} from 'react';

import {ReactSVG} from 'react-svg';
import IconGrid from '@ergeon/core-components/src/assets/icon-grid.svg';
import IconLister from '@ergeon/core-components/src/assets/icon-lister.svg';
import {localStorage as ls} from '@ergeon/erg-utils-js';
import classNames from 'classnames';

import './QuoteListPageHeader.scss';
import {LS_ERGEON_CUSTOMER_MENU_QUOTE_VIEW_PREFERENCE, CustomerQuoteViewPreference} from './constants';
import {QuoteListPageHeaderProps} from './types';

const QuoteListPageHeader = (props: QuoteListPageHeaderProps) => {
  const {handleLocalStorageChange} = props;

  const [customerViewPreference, setCustomerViewPreference] = useState(CustomerQuoteViewPreference.Grid);

  useEffect(
    function getCustomerViewPreference() {
      const storage: CustomerQuoteViewPreference | null = ls.get(LS_ERGEON_CUSTOMER_MENU_QUOTE_VIEW_PREFERENCE);

      if (storage) {
        setCustomerViewPreference(CustomerQuoteViewPreference[storage]);
        !!handleLocalStorageChange && handleLocalStorageChange(CustomerQuoteViewPreference[storage]);
      }
    },
    [handleLocalStorageChange]
  );

  const handleIconClick = useCallback(
    (value) => {
      setCustomerViewPreference(value);
      ls.set(LS_ERGEON_CUSTOMER_MENU_QUOTE_VIEW_PREFERENCE, value);
      !!handleLocalStorageChange && handleLocalStorageChange(value);
    },
    [handleLocalStorageChange]
  );

  return (
    <div className="quote-list-page-header">
      <span>Quotes</span>
      <div className="icon-wrapper">
        <ReactSVG
          aria-label="grid button"
          className={classNames('icon-button ', {
            active: customerViewPreference === CustomerQuoteViewPreference.Grid,
          })}
          onClick={() => handleIconClick(CustomerQuoteViewPreference.Grid)}
          role="button"
          src={IconGrid}
        />
        <ReactSVG
          aria-label="lister button"
          className={classNames('icon-button ', {
            active: customerViewPreference === CustomerQuoteViewPreference.Lister,
          })}
          onClick={() => handleIconClick(CustomerQuoteViewPreference.Lister)}
          role="button"
          src={IconLister}
        />
      </div>
    </div>
  );
};

export default QuoteListPageHeader;
