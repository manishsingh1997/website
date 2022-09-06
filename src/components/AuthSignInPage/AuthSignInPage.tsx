import React, {useMemo, useState} from 'react';

import {useLocation} from 'react-router';
import {Link} from 'react-router-dom';
import {ReactSVG} from 'react-svg';
import LogoutIcon from '@ergeon/core-components/src/assets/icon-logout-solid.svg';

import SingleCardOrig from '../common/SingleCard';
import Success from '../common/Success';
import {getNextRedirectValue} from '../../utils/auth';

import AuthSignInPageForm from './Form';

import './index.scss';

const SingleCard = ({children: content, className}: {children: React.ReactNode, className: string}) => (
  <SingleCardOrig {...{className, content}} />
);

const AuthSignInPage = () => {
  const location = useLocation();
  const [isFormSuccess, setIsFormSuccess] = useState(false);

  const next = useMemo(() => getNextRedirectValue(location.search), [location.search]);
  const title = useMemo(() => (
    next ? 'Looks like you’re not authenticated' : 'Sign in to Ergeon'
  ), [next]);

  return (
    <SingleCard className="signin-page">
      {!isFormSuccess &&
        <AuthSignInPageForm
          bottomContent={next ? (
            <Link className="signin-skip" to={next as string}>
              View as guest <ReactSVG src={LogoutIcon} />
            </Link>
          ) : null}
          next={next}
          onFormSuccess={setIsFormSuccess}
          title={title}>
            {!next &&
              <p className="center signin-page__form-header small-text spacing after__is-24">
                <i>New to ergeon?</i> <Link to="/request-quote">Request a quote</Link>.
              </p>
            }
        </AuthSignInPageForm>
      }
      {isFormSuccess &&
        <Success header="We have sent you an email with a link to sign in" />
      }
    </SingleCard>
  );
};

export default AuthSignInPage;
