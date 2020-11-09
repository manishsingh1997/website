import config, {PRODUCTION} from 'website/config';

/**
 * Logs when level is not PRODUCTION, e.g. on dev and staging.
 * @param  {...any} args
 */
export const logDev = (...args) => {
  if (config.level !== PRODUCTION) {
    console.log(...args);
  }
};
