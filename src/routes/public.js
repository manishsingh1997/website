import AboutPage from '../components/AboutPage';
import AuthConfirmSignInPage from 'containers/AuthConfirmSignInPage';
import AuthLogoutPage from 'containers/AuthLogoutPage';
import AuthSignInPage from 'components/AuthSignInPage';
import CareersPage from '../components/CareersPage';
import ContactUsPage from 'components/ContactUsPage';
import FAQPage from 'components/FAQPage';
import HelpLandingPage from 'components/HelpLandingPage';
import HelpPage from 'components/HelpPage';
import HomePage from 'components/HomePage';
import LocationsPage from 'components/LocationsPage';
import PhotoGallery from 'components/PhotoGallery';
import RequestQuotePage from 'containers/RequestQuotePage';
import WarrantiesPage from 'components/WarrantiesPage';

/**
 * This routes can be visited without any authentication.
 * The most of them are included into the main sitemap.
 */
export const basicRoutes = [
  {
    component: HomePage,
    exact: true,
    sitemap: false,
    path: '/',
  },
  {
    component: CareersPage,
    exact: true,
    path: '/careers',
  },
  {
    component: ContactUsPage,
    exact: true,
    path: '/contacts',
  },
  {
    component: AboutPage,
    exact: true,
    path: '/about-ergeon',
  },
  {
    component: FAQPage,
    exact: true,
    path: '/faq',
  },
  {
    component: WarrantiesPage,
    exact: true,
    path: '/licenses-warranties',
  },
  {
    component: LocationsPage,
    exact: true,
    path: '/locations',
  },
  {
    component: RequestQuotePage,
    exact: true,
    path: '/request-quote',
  },
];

/**
 * Routes of the gallery section.
 */
export const galleryRoutes = [
  {
    component: PhotoGallery,
    exact: true,
    path: '/gallery',
  },
  {
    component: PhotoGallery,
    exact: true,
    sitemap: false,
    path: '/gallery/:productSlug/:categorySlug',
  },
  {
    component: PhotoGallery,
    exact: true,
    sitemap: false,
    path: '/gallery/:productSlug/:categorySlug/:groupSlug',
  },
];

// Help node path to be matched from outside.
export const helpNodePath = '/help/:nodeKey';

/**
 * Routes of the help section.
 */
export const helpRoutes = [
  {
    component: HelpLandingPage,
    exact: true,
    path: '/help',
  },
  {
    component: HelpPage,
    exact: true,
    path: '/help/search',
  },
  {
    component: HelpPage,
    exact: true,
    sitemap: false,
    path: helpNodePath,
  },
];

/**
 * All authentication routes.
 */
export const authRoutes = [
  {
    component: AuthSignInPage,
    exact: true,
    sitemap: false,
    path: '/app/sign-in',
  },
  {
    component: AuthConfirmSignInPage,
    exact: true,
    sitemap: false,
    path: '/app/confirm-sign-in',
  },
  {
    component: AuthLogoutPage,
    exact: true,
    sitemap: false,
    path: '/app/logout',
  },
];

export default [
  ...basicRoutes,
  ...galleryRoutes,
  ...helpRoutes,
  ...authRoutes,
];
