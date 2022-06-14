export const getAsset = (src: string, ext: 'jpeg' | 'pdf') => {
  const filename = src.match(/file\/d\/([^/]+)/)?.[1];
  if (!filename) return '';
  return `https://s3.us-west-2.amazonaws.com/dev.ergeon.com/cities_photos/${filename}.${ext}`;
};
