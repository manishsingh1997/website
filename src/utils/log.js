/**
 * Logs when level is not PRODUCTION, e.g. on dev and staging.
 * @param  {...any} args
 */
export const logDev = (...args) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(...args); // eslint-disable-line
  }
};
