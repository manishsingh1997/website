import React, { useEffect, useMemo } from 'react';
import { isQuoteDetailURL, isUnsubscribeURL } from '../../utils/urls';
import { AnonymousUser, SideBar, UserError, LayoutView } from './components';
import { AppLayoutProps } from './types';
import { initSmartLook } from './utils';
import BreadCrumbs from './components/BreadCrumbs';

import './AppLayout.scss';

const AppLayout = (props: AppLayoutProps) => {
  const {
    auth: { isAuthLoading, isUserLoading, user, userError },
    location,
    match,
    children,
  } = props;
  const isLoading = isAuthLoading || isUserLoading;
  const isQuotePage = isQuoteDetailURL(location.pathname);

  const requiresAuthentication = useMemo(() => {
    // Unsubscribe page is special case - authentication not needed
    // Quote detail page is special case - authentication not needed, don't show sidebar
    const isUnsubscribedURL = isUnsubscribeURL(location.pathname, location.search);
    if (isUnsubscribedURL || isQuotePage) {
      return false;
    }
    return true;
  }, [location, isQuotePage]);

  useEffect(() => {
    initSmartLook();
  }, []);

  if (!isLoading && !user && requiresAuthentication) {
    if (userError) {
      console.error(userError);
      return <UserError />;
    }
    return <AnonymousUser />;
  }

  return (
    <div className="customer-app-layout">
      {isQuotePage ? (
        <LayoutView isLoading={isLoading} match={match}>
          {children}
        </LayoutView>
      ) : (
        <div className="cards-wrapper">
          <div className="customer-app-sidebar">
            <SideBar location={location} match={match} userFullName={user?.full_name} />
          </div>
          <div className="customer-app-wrapper">
            <div className="customer-app-breadcrumbs">
              <BreadCrumbs />
            </div>
            <div className="customer-app-content card shadow soft-border">
              <LayoutView isLoading={isLoading} match={match}>
                {children}
              </LayoutView>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
