import React, {useState, useCallback} from 'react';
import Success from '../../common/Success';
import AppLoader from '../../common/AppLoader';
import SimpleLeadForm from '../SimpleLeadForm';
import {Address} from '../utils';
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
};

const TellUsForm = (props: TellUsFormProps) => {
  const {
    auth: {isAuthLoading, isUserLoading, user},
    updateProduct,
    product,
    lead,
    configs,
  } = props;

  const [showThankYou, setShowThankYou] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);

  const handleSubmit = useCallback((data) => {
    const {email} = data;
    setHasEmail(Boolean(email));
    setShowThankYou(true);
  }, []);

  const ContactForm = useCallback(() => {
    return (
      <section className="TellUsForm">
        <div className="TellUsForm-Wrapper">
          <h2 className="h3 TellUsForm-Header">Tell us about your project</h2>
          <p className="TellUsForm-Text">
            We're here to help! Please describe your fencing needs and we'll get in touch within 24 hours.
          </p>
          <div>
            <SimpleLeadForm
              configs={configs}
              lead={lead || {}}
              onProductChange={(product) => updateProduct(product)}
              onSubmit={handleSubmit}
              product={product}
              user={user}
            />
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
