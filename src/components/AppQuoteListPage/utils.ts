import {CustomerQuoteProps, CustomerQuoteResponseProps} from './types';

// TODO: the preview image will be implemented in ENG-11912
const mockUrl =
  'https://ergeon-converters.s3-us-west-2.amazonaws.com/staging/schema=24,25,26,27,28,29,30,31,212,213,235&code=SG,GDA,GF6,GW4,GRCC,GP4,GZSF,GLSLK,GODNS,LPNA,GDRZ/300x300_2d-front.png';

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
      previewUrl: item.quote.preview_image || mockUrl,
    };
  });

  return quote as unknown as CustomerQuoteProps[];
};
