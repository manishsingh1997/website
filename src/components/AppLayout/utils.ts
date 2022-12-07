import smartlookClient from 'smartlook-client';

export const initSmartLook = (smartlookID = process.env.SMARTLOOK_ID) => {
  if (process.env.NODE_ENV !== 'development' && smartlookID) {
    smartlookClient.init(smartlookID);
  }
};
