import React, { useState, useCallback } from 'react';
import Success from '../common/Success';
import AppLoader from '../common/AppLoader';
import SimpleLeadForm from './SimpleLeadForm';
import { Address } from './utils';

import './TellUsForm.scss';

type TellUsFormProps = {
  auth: {
    isAuthLoading: boolean,
    isUserLoading: boolean,
    user: {
      email: string,
      full_name: string,
      phone_number: string,
    },
  },
  updateProduct: (product: string) => void,
  product: string,
  lead: {
    address: Address,
  },
  configs: [],
};

const TellUsForm = (props: TellUsFormProps) => {
  const {
    auth: { isAuthLoading, isUserLoading, user },
    updateProduct,
    product,
    lead,
    configs,
  } = props;

  const [showThankYou, setShowThankYou] = useState(false);

  const ContactForm = useCallback(() => {
    return (
      <section className="TellUsForm">
        <div className='TellUsForm-Wrapper'>
          <h3 className="TellUsForm-Header">Tell us about your project</h3>
          <p className="TellUsForm-Text">
            We're here to help! Tell us about your project needs and we'll get in touch within 24 hours.
          </p>
          <div>
            <SimpleLeadForm
              configs={configs}
              lead={lead || {}}
              onProductChange={(product) => updateProduct(product)}
              onSubmit={() => setShowThankYou(true)}
              product={product}
              user={user} />
          </div>
        </div>
      </section>
    )
  }, [configs, lead, product, updateProduct, user]);

  const ThankYouMessage = useCallback(() => {
    return (
      <div className="request-quote-page">
        <Success header="Thanks!" text="We will call you within 24 hours" />
        {!user && (
          <span>
            <p className="confirmation-email spacing before__is-24">
              We have sent a confirmation message to your email. Please follow the instructions there.
            </p>
          </span>
        )}
      </div>
    );
  }, [user]);

  if (isAuthLoading || isUserLoading) {
    return <AppLoader />;
  }

  return showThankYou ? <ThankYouMessage /> : <ContactForm />;
}

export default TellUsForm;
