export const getAsset = (src: string, ext: 'jpeg' | 'pdf') => {
  const filename = src.match(/file\/d\/([^/]+)/)?.[1];
  if (!filename) return '';
  return `https://s3.us-west-2.amazonaws.com/${process.env.S3_BUCKET}/cities_photos/${filename}.${ext}`;
};
