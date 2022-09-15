import React, { useState, useMemo, useCallback } from 'react';

import classNames from 'classnames';
import { Button, Spinner, Notification } from '@ergeon/core-components';
// eslint-disable-next-line import/named
import { StripeElementChangeEvent } from '@stripe/stripe-js';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import { some } from 'lodash';

import IconCards from 'assets/icon-cards.png';
import IconSSL from 'assets/icon-ssl.svg';
import IconCardSecure from 'assets/icon-card-secure.svg';
import IconMarkGreen from 'assets/icon-check-mark.svg';

import { CARD_TRANSACTION_FEE, CONTACT_EMAIL } from '../../website/constants';

import { ApprovalPayMethod } from './types';

import './BillingForm.scss';

const STRIPE_CARD_ELEMENT_CLASS = 'StripeCardElement';

type BillingFormProps = {
  contractUrl: string,
  error: string | null,
  isApproved: boolean,
  isScopeChange: boolean,
  onSubmit: (data: { [key: string]: string }) => Promise<void>,
  approvalPayMethod: ApprovalPayMethod | null,
  quoteId: number,
  total: string,
  isSmall: boolean,
}

const BillingForm = (props: BillingFormProps) => {
  const {
    contractUrl,
    error,
    isApproved,
    isScopeChange,
    onSubmit,
    approvalPayMethod,
    quoteId,
    total,
    isSmall = false,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const stripe = useStripe();
  const elements = useElements();

  const isQuoteApproved = useMemo(() => isApproved, [isApproved]);

  const totalPayText = useMemo(() => isScopeChange ? 'New total pay' : 'Total pay', [isScopeChange]);

  const classes = useMemo(() => classNames('billing-form', {
    'billing-form--with-payment-method-details': isQuoteApproved,
    'billing-form--loading': isLoading,
    'form-small': isSmall
  }), [isQuoteApproved, isLoading, isSmall]);

  const submitToken = useCallback((token) => {
    return onSubmit({
      stripe_token: token,
    });
  }, [onSubmit]);

  const handleFieldChange = useCallback((event: StripeElementChangeEvent) => {
    const { elementType, complete, error } = event;
    if (error) {
      setValidationErrors((errors) => ({
        ...errors,
        [elementType]: error.message,
      }));
    }
    if (complete) {
      setValidationErrors((errors) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [elementType]: _remove, ...rest } = errors;
        return rest;
      });
    }
  }, [validationErrors]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (!stripe || !elements || !isTermsAccepted) return;

    const cardElement = elements.getElement(CardNumberElement);
    if (cardElement) {
      setIsLoading(true);
      stripe.createToken(cardElement)
        .then(({ token, error }) => {
          if (error) {
            setErrorMessage(error.message as string);
            return;
          }
          const { id } = token;
          setErrorMessage(null);
          return submitToken(id);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [stripe, elements, isTermsAccepted, submitToken]);

  const errorNotification = useMemo(() => {
    const errorMsg = error || errorMessage;

    if (!errorMsg) return null;

    return (
      <div className="billing-form__error">
        <Notification mode="embed" type="Error">
          There was an error trying to approve payment.
          <br />
          {errorMsg}
        </Notification>
      </div>
    );
  }, [error, errorMessage]);

  const approvalPayMethodDetails = useMemo(() => {
    const lastDigits = approvalPayMethod && approvalPayMethod['card_last_digits'];
    return (
      <div className="billing-form__payment-method-details">
        <div className="billing-form__payment-method-details-item">
          <div className="billing-form__payment-method-details-item-name">Card number</div>
          <div className="billing-form__payment-method-details-item-value">{lastDigits && `*${lastDigits}`}</div>
        </div>
        <div className="billing-form__payment-method-details-item">
          <div className="billing-form__payment-method-details-item-name">Exp. date</div>
          <div className="billing-form__payment-method-details-item-value">
            {approvalPayMethod && approvalPayMethod['card_expiration_date_short']}
          </div>
        </div>
      </div>
    );
  }, [approvalPayMethod]);

  const cardElements = useMemo(() => {
    return (
      <div className="billing-form__fields">
        <div className="billing-form__card-number">
          <CardNumberElement
            onChange={handleFieldChange}
            options={{
              classes: {
                base: STRIPE_CARD_ELEMENT_CLASS,
              },
              disabled: isLoading,
              placeholder: 'Card Number',
            }}
          />
          {validationErrors['cardNumber'] && (
            <p className="Form-error">{validationErrors['cardNumber']}</p>
          )}
        </div>
        <div className="billing-form__expiration-date">
          <CardExpiryElement
            onChange={handleFieldChange}
            options={{
              classes: {
                base: STRIPE_CARD_ELEMENT_CLASS,
              },
              disabled: isLoading,
              placeholder: 'Exp. Date',
            }}
          />
          {validationErrors['cardExpiry'] && (
            <p className="Form-error">{validationErrors['cardExpiry']}</p>
          )}
        </div>
        <div className="billing-form__cvc">
          <CardCvcElement
            onChange={handleFieldChange}
            options={{
              classes: {
                base: STRIPE_CARD_ELEMENT_CLASS,
              },
              disabled: isLoading,
            }}
          />
        </div>
      </div>
    );
  }, [validationErrors, isLoading, handleFieldChange]);

  return (
    <div className={classNames(classes)}>
      <form className="billing-form__content" onSubmit={handleSubmit}>
        <div className="billing-form__information">
          <div className="billing-form__title-section">
            <h4>Billing Information</h4>
            <div className="billing-form__icons">
              <img className="billing-form__icon-cards" src={IconCards} />
              <img className="billing-form__icon-secure" src={IconSSL} />
            </div>
          </div>
          {!isQuoteApproved && cardElements}
          {isQuoteApproved && approvalPayMethod && approvalPayMethodDetails}
          <div className="billing-form__card-disclaimer">
            <img className="billing-form__card-disclaimer-icon" src={IconCardSecure} />
            <div className="billing-form__card-disclaimer-text">
              You <b>will not be charged</b> until after your service is completed. Credit/debit card payments are
              subject to an additional {CARD_TRANSACTION_FEE} transaction fee. The current payment options we have
              aside from credit card are bank transfer and check payments.
            </div>
          </div>
        </div>
        <div className="billing-form__actions">
          <div className="billing-form__total">
            <div className="billing-form__total-pay">
              {totalPayText}
              <div className="billing-form__price">{total}</div>
            </div>
            <div className="billing-form__approve">
              <Button
                className="billing-form__approve-button"
                disabled={!stripe || !isTermsAccepted || isLoading || some(Object.values(validationErrors))}
                size="large"
              >
                {isLoading ? (
                  <Spinner active={true} borderWidth={0.15} color="white" size={24} />
                ) : (
                  'Approve and place order'
                )}
              </Button>
            </div>
          </div>
          <a
            className="billing-form__request-changes"
            href={`mailto:${CONTACT_EMAIL}?subject=Quote change request: ${quoteId}`}
          >
            Request changes to quote
          </a>
          <div className="billing-form__terms">
            <div
              className={classNames('billing-form__accept-terms-button', {
                'billing-form__accept-terms-button--selected': isTermsAccepted,
              })}
              data-testid="accept-terms-button"
              onClick={() => setIsTermsAccepted(!isTermsAccepted)}
            >
              {isTermsAccepted && <img className="billing-form__accept-terms-button-icon" src={IconMarkGreen} />}
            </div>
            <span className="billing-form__terms-accept">
              I accept{' '}
              <a className="billing-form__terms-link" href={contractUrl} rel="noopener noreferrer" target="_blank">
                the terms and condition included in the contract
              </a>
            </span>
          </div>
        </div>
      </form>
      {errorNotification}
    </div>
  );
};

export default BillingForm;
