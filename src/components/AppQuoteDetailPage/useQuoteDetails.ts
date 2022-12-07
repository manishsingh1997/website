import {useState, useCallback, useEffect} from 'react';

import {ErrorResponse, ParsedAPIErrorType} from '../../utils/types';
import {getQuoteDetails} from '../../api/app';
import {parseAPIError} from '../../utils/api';
import {Quote} from '../types';

const useQuoteDetails = (customerGID: string, secret: string) => {
  useEffect(() => {
    getQuoteDetailsFromAPI();
  }, []);

  const [isLoading, setIsloading] = useState(true);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteError, setQuoteError] = useState<ParsedAPIErrorType | null>(null);

  const getQuoteDetailsFromAPI = useCallback(async () => {
    try {
      const data = await getQuoteDetails(customerGID, secret);
      setQuote(data.data);
      setQuoteError(null);
    } catch (apiError) {
      const error = apiError as {response?: ErrorResponse | undefined};
      setQuote(null);
      setQuoteError(parseAPIError(error));
    } finally {
      setIsloading(false);
    }
  }, [customerGID, secret]);

  return {isLoading, quote, quoteError};
};

export default useQuoteDetails;
