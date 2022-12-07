import {CustomerQuoteProps, CustomerQuoteResponseProps} from './types';

export const quoteReponseFormatter = (quoteResponse: CustomerQuoteResponseProps[]): CustomerQuoteProps[] => {
  if (!quoteResponse) {
    return [];
  }

  const quote = quoteResponse.map((item: CustomerQuoteResponseProps) => {
    return {
      quoteSecret: item.secret,
      quoteId: item.quote.id,
      houseId: item.quote.order.house.id,
      title: item.quote.title || `Quote #${item.quote.id} - ${item.quote.order.product.name}`,
      status: item.quote.status.label,
      totalPrice: item.quote.total_price,
      sendOn: item.quote.send_to_customer || '',
      previewUrl: item.quote.preview_image,
    };
  });

  return quote as unknown as CustomerQuoteProps[];
};
