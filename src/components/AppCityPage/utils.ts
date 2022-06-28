import {City} from './types';

export const getAsset = (src: string, ext: 'jpeg' | 'pdf') => {
  const filename = src.match(/file\/d\/([^/]+)/)?.[1];
  if (!filename) return src;
  return `https://s3.us-west-2.amazonaws.com/${process.env.S3_BUCKET}/cities_photos/${filename}.${ext}`;
};

export const makePhoneLink = (phone: string, options = {countryCode: '+1'}) => {
  let link = phone.replace(/[^\d+]/g, '');
  if (!/^\+/.test(link)) {
    link = `${options.countryCode}${link}`;
  }
  return `tel:${link}`;
};

export const formatFooterLicenses = (licenses?: City['licenses'], licenseUrl?: string) => {
  if (!licenses) return null;
  return licenses.map((license) => {
    return {
      name: `License #: ${license}`,
      url: licenseUrl,
    };
  });
};
