import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {some} from 'lodash';
import {Button, FormField, Input, Spinner, Notification} from '@ergeon/core-components';

import {
  AMEX,
  DINERS,
  getCardType,
  cardNumberValidation,
  cardExpDateValidation,
  cardCvcValidation,
  getStripeToken,
} from 'utils/billing';
import {CARD_TRANSACTION_FEE, CONTACT_EMAIL} from 'website/constants';

import IconCards from 'assets/icon-cards.png';
import IconSSL from 'assets/icon-ssl.svg';
import IconCardSecure from 'assets/icon-card-secure.svg';
import IconMarkGreen from 'assets/icon-check-mark.svg';

import './BillingForm.scss';

export default class BillingForm extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    houseId: PropTypes.number,
    isApproved: PropTypes.bool,
    onSubmit: PropTypes.func,
    paymentMethod: PropTypes.object,
    quoteId: PropTypes.number,
    termsAndConditionsUrl: PropTypes.string,
    total: PropTypes.string,
  };

  state = {
    isLoading: false,
    editMode: false,
    errors: {
      card: cardNumberValidation(''),
      expirationDate: cardExpDateValidation(''),
      cvc: cardCvcValidation(''),
    },
    errorMessage: null,
    form: {
      termsAccepted: false,
      card: '',
      expirationDate: '',
      cvc: '',
    },
    validate: {},
  };

  isQuoteApproved() {
    return this.props.isApproved;
  }

  submitToken = (token) => {
    const {houseId} = this.props;

    return this.props.onSubmit({
      'stripe_token': token,
      'house': houseId,
    });
  };

  handleFieldChange(event, name, value) {
    const validation = {
      'card': cardNumberValidation,
      'expirationDate': cardExpDateValidation,
      'cvc': cardCvcValidation,
    }[name];

    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
      errors: {
        ...this.state.errors,
        [name]: validation && validation(value),
      },
    });
  }

  handleTermsCheck(value) {
    this.handleFieldChange({}, 'termsAccepted', value);
  }

  handleBlur(name) {
    this.setState({
      validate: {
        ...this.state.validate,
        [name]: true,
      },
    });
  }

  handleSubmit(event) {
    const {form, errors} = this.state;

    event.preventDefault();

    if (!some(Object.values(errors)) && form.termsAccepted) {
      this.setState({isLoading: true});
      getStripeToken({
        card: form.card,
        expirationDate: form.expirationDate,
        cvc: form.cvc,
      })
        .then(token => {
          this.setState({
            errors: {},
            errorMessage: null,
          });
          return this.submitToken(token);
        })
        .catch(result => {
          if (result.param) {
            this.setState({
              errors: {
                [result.param]: result._error,
              },
            });
          } else {
            this.setState({
              errorMessage: result._error,
            });
          }
        })
        .finally(() => {
          this.setState({isLoading: false});
        });
    }
  }

  handleEditClick(event) {
    const {editMode} = this.state;

    event.preventDefault();

    this.setState({editMode: !editMode});
  }

  getCardMask(card) {
    const cardType = getCardType(card.replace(/[_\s]/gi, ''));
    let mask;
    switch (cardType) {
      case AMEX:
        mask = '9999 999999 99999';
        break;
      case DINERS:
        mask = '9999 9999 9999 99';
        break;
      default:
        mask = '9999 9999 9999 9999';
    }
    return mask;
  }

  renderError() {
    const {error: propsError} = this.props;
    const {errorMessage: stateError} = this.state;
    const error = propsError || stateError;

    if (!error) return null;

    return (
      <div className="billing-form__error">
        <Notification
          mode="embed"
          type="Error">
          There was an error trying to approve payment.<br />
          {error}
        </Notification>
      </div>
    );
  }

  renderEditOrCancelButton() {
    const {editMode} = this.state;

    return (
      <Button
        className="billing-form__cancel-edit-button"
        flavor="regular"
        onClick={this.handleEditClick.bind(this)}
        size="small"
        taste="solid">
        {editMode ? 'Cancel' : 'Edit'}
      </Button>
    );
  }

  renderFormFields() {
    const {form, errors, validate, isLoading} = this.state;
    const {card, expirationDate, cvc} = form;

    return (
      <div className="billing-form__fields">
        <div className="billing-form__card-number">
          <FormField>
            <Input
              isDisabled={isLoading}
              isValid={validate.card ? !errors?.card : undefined}
              label="Card Number"
              mask={this.getCardMask(card)}
              name="card"
              onBlur={this.handleBlur.bind(this, 'card')}
              onChange={this.handleFieldChange.bind(this)}
              tabIndex="1"
              type="tel"
              validationMessage={errors?.card}
              value={card} />
          </FormField>
        </div>
        <div className="billing-form__expiration-date">
          <FormField>
            <Input
              className="FormControl--short"
              isDisabled={isLoading}
              isValid={validate.expirationDate ? !errors?.expirationDate : undefined}
              label="Exp. Date"
              mask="99/99"
              name="expirationDate"
              onBlur={this.handleBlur.bind(this, 'expirationDate')}
              onChange={this.handleFieldChange.bind(this)}
              placeholder="MM/YY"
              tabIndex="2"
              type="tel"
              validationMessage={errors?.expirationDate}
              value={expirationDate} />
          </FormField>
        </div>
        <div className="billing-form__cvc">
          <FormField>
            <Input
              className="FormControl--short"
              isDisabled={isLoading}
              isValid={validate.cvc ? !errors?.cvc : undefined}
              label="CVC"
              name="cvc"
              onBlur={this.handleBlur.bind(this, 'cvc')}
              onChange={this.handleFieldChange.bind(this)}
              tabIndex="3"
              type="tel"
              validationMessage={errors?.cvc}
              value={cvc} />
          </FormField>
        </div>
      </div>
    );
  }

  renderPaymentMethodDetails() {
    const {paymentMethod} = this.props;
    const lastDigits = paymentMethod && paymentMethod['card_last_digits'];
    return (
      <div className="billing-form__payment-method-details">
        <div className="billing-form__payment-method-details-item">
          <div className="billing-form__payment-method-details-item-name">
            Card number
          </div>
          <div className="billing-form__payment-method-details-item-value">
            {lastDigits && `*${lastDigits}`}
          </div>
        </div>
        <div className="billing-form__payment-method-details-item">
          <div className="billing-form__payment-method-details-item-name">
            Exp. date
          </div>
          <div className="billing-form__payment-method-details-item-value">
            {paymentMethod && paymentMethod['card_expiration_date_short']}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {form, errors, isLoading} = this.state;
    const {termsAccepted} = form;
    const {paymentMethod, quoteId, termsAndConditionsUrl, total} = this.props;
    const classes = {
      'billing-form': true,
      'billing-form--with-payment-method-details': this.isQuoteApproved(),
      'billing-form--loading': isLoading,
    };

    return (
      <div className={classNames(classes)}>
        <form className="billing-form__content" onSubmit={this.handleSubmit.bind(this)}>
          <div className="billing-form__information">
            <div className="billing-form__title-section">
              <h4>
                Billing Information
              </h4>
              <div className="billing-form__icons">
                <img className="billing-form__icon-cards" src={IconCards}/>
                <img className="billing-form__icon-secure" src={IconSSL}/>
              </div>
            </div>
            {!this.isQuoteApproved() && this.renderFormFields()}
            {this.isQuoteApproved() && paymentMethod && this.renderPaymentMethodDetails()}
            <div className="billing-form__card-disclaimer">
              <img className="billing-form__card-disclaimer-icon" src={IconCardSecure} />
              <div className="billing-form__card-disclaimer-text">
                You <b>will not be charged</b> until after your service is completed.
                Credit/debit card payments are subject to an additional {CARD_TRANSACTION_FEE} transaction fee.
              </div>
            </div>
          </div>
          <div className="billing-form__actions">
            <div className="billing-form__total-pay">
              Total pay
              <div className="billing-form__price">
                {total}
              </div>
            </div>
            <div className="billing-form__approve">
              <Button
                className="billing-form__approve-button"
                disabled={some(Object.values(errors)) || !termsAccepted || isLoading}
                size="large">
                {
                  isLoading ?
                    <Spinner active={true} borderWidth={0.15} color="white" size={24}/> :
                    'Approve and place order'
                }
              </Button>
            </div>
            <a
              className="billing-form__request-changes"
              href={`mailto:${CONTACT_EMAIL}?subject=Quote change request: ${quoteId}`}>
              Request changes to quote
            </a>
            <div className="billing-form__terms">
              <div
                className={classNames(
                  'billing-form__accept-terms-button',
                  {'billing-form__accept-terms-button--selected': termsAccepted}
                )}
                onClick={this.handleTermsCheck.bind(this, !termsAccepted)}>
                {termsAccepted && <img
                  className="billing-form__accept-terms-button-icon"
                  src={IconMarkGreen} />}
              </div>
              <span className="billing-form__terms-accept">
                I accept <a
                  className="billing-form__terms-link"
                  href={termsAndConditionsUrl}
                  rel="noopener noreferrer"
                  target="_blank">
                  Terms and Conditions
                </a>
              </span>
            </div>
          </div>
        </form>
        {this.renderError()}
      </div>
    );
  }
}
