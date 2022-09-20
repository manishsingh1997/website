import React, { useState, useCallback, useMemo, useEffect } from 'react';

import { ReactSVG } from 'react-svg';
import IconCheckMark from '@ergeon/core-components/src/assets/icon-check-mark.svg';
import classNames from 'classnames';
// @ts-ignore
import { FENCE_SLUG } from '@ergeon/core-components/src/constants';

import Success from '../../common/Success';
import AppLoader from '../../common/AppLoader';
import SimpleLeadForm from '../SimpleLeadForm/SimpleLeadForm';
import { Address } from '../utils';
import { GRASS_PRODUCT } from '../../../website/constants';

import useCustomLeadForm, { CustomLeadFormType } from './useCustomLeadForm';

import './TellUsForm.scss';

type TellUsFormProps = {
  auth: {
    isAuthLoading: boolean;
    isUserLoading: boolean;
    user: {
      email: string;
      full_name: string;
      phone_number: string;
    };
  };
  updateProduct: (product: string) => void;
  product: string;
  lead: {
    address: Address;
  };
  configs: [];
  centerText: boolean;
  type?: CustomLeadFormType;
};

const TellUsForm = (props: TellUsFormProps) => {
  const {
    auth: { isAuthLoading, isUserLoading, user },
    updateProduct,
    product,
    lead,
    configs,
    centerText,
    type = CustomLeadFormType.Fence,
  } = props;

  const [showThankYou, setShowThankYou] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);

  const { title, onFieldDisplay } = useCustomLeadForm(type);

  const handleSubmit = useCallback((data) => {
    const { email } = data;
    setHasEmail(Boolean(email));
    setShowThankYou(true);
  }, []);

  const headerClassName = useMemo(() => {
    return classNames('h3 TellUsForm-Header', {
      'is-centerHeader': centerText,
    });
  }, [centerText]);

  const footerClassName = useMemo(() => {
    return classNames('TellUsForm-Footer', {
      'is-centerFooter': centerText,
    });
  }, [centerText]);

  useEffect(function setUpProduct() {
    // lets switch to the proper product for artificial grass
    if (type === CustomLeadFormType.ArtificialGrass) {
      updateProduct(GRASS_PRODUCT);
    } else {
      // default to fence
      updateProduct(FENCE_SLUG);
    }
  }, [type, updateProduct]);

  const ContactForm = useCallback(() => {
    return (
      <section className="TellUsForm">
        <div className="TellUsForm-Wrapper">
          <h2 className={headerClassName}>{title}</h2>
          <div>
            <SimpleLeadForm
              configs={configs}
              lead={lead || {}}
              onFieldDisplay={onFieldDisplay}
              onProductChange={(product) => updateProduct(product)}
              onSubmit={handleSubmit}
              product={product}
              user={user}
            />
          </div>
          <div className={footerClassName}>
            <div>
              <div className="highlight">
                <ReactSVG className="highlight-icon" src={IconCheckMark} />
                <span>No commitment</span>
              </div>
              <div className="highlight">
                <ReactSVG className="highlight-icon" src={IconCheckMark} />
                <span>Transparent pricing</span>
              </div>
              <div className="highlight">
                <ReactSVG className="highlight-icon" src={IconCheckMark} />
                <span>Fast response time</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }, [configs, lead, product, updateProduct, user]);

  const ThankYouMessage = useCallback(() => {
    return (
      <div className="TellUsForm-Success">
        <Success header="Thanks!" scrollOnMount={false} text="We will call you within 24 hours" />
        {!user && hasEmail && (
          <span>
            <p className="TellUsForm-Success--isEmailSent spacing before__is-24">
              We have sent a confirmation message to your email. Please follow the instructions there.
            </p>
          </span>
        )}
      </div>
    );
  }, [user, hasEmail]);

  if (isAuthLoading || isUserLoading) {
    return <AppLoader />;
  }

  return showThankYou ? <ThankYouMessage /> : <ContactForm />;
};

export default TellUsForm;
