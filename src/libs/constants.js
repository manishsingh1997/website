export const UUID_COOKIE_NAME = 'fences-uuid';
import config, {PRODUCTION} from './config';

export const isProduction = config.level === PRODUCTION;

export const DEFAULT_SOURCE_VALUE = 'website';
export const FENCE_SLUG = 'fence-replacement';
export const DRIVEWAY_SLUG = 'driveway-installation';
export const products = [
  {slug: FENCE_SLUG, name: 'Fences & Gates'},
  {slug: DRIVEWAY_SLUG, name: 'Driveways & Patios'},
];
