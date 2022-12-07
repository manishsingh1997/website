import {useCallback, useEffect, useState} from 'react';

import {HouseType} from '../types';

import {CustomerQuoteProps} from './types';

const useHouseQuotes = (quotes: CustomerQuoteProps[], selectedHouse?: HouseType) => {
  const [houseQuotes, setHouseQuotes] = useState<CustomerQuoteProps[]>([]);
  useEffect(() => {
    if (selectedHouse?.id) {
      onSelectedHouseChange();
    }
  }, [selectedHouse?.id, quotes]);

  const onSelectedHouseChange = useCallback(() => {
    const filteredQuotes = quotes?.filter((quote) => quote?.houseId === selectedHouse?.id);
    setHouseQuotes(filteredQuotes);
  }, [quotes, selectedHouse]);

  return houseQuotes;
};

export default useHouseQuotes;
