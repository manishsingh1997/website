import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {some} from 'lodash';
import {Button, Spinner, Notification} from '@ergeon/core-components';

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

import MaskedTextInput from 'components/common/MaskedTextInput';
import TextInput from 'components/common/TextInput';

import IconCards from 'assets/icon-cards.png';
import IconSSL from 'assets/icon-ssl.svg';
import IconCardSecure from 'assets/icon-card-secure.svg';
import IconMarkGreen from 'assets/icon-check-mark.svg';

import './BillingForm.scss';

export default class BillingForm extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    houseId: PropTypes.number,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func,
    paymentMethod: PropTypes.object,
    quoteApproved: PropTypes.bool,
    quoteId: PropTypes.number,
    termsAndConditionsUrl: PropTypes.string,
    total: PropTypes.string,
  };

  state = {
    editMode: false,
    errors: {},
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
    return this.props.quoteApproved;
  }

  submitToken = (token) => {
    const {houseId} = this.props;

    this.props.onSubmit && this.props.onSubmit({
      'stripe_token': token,
      'house': houseId,
    });
  };

  handleFieldChange(name, value) {
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
      getStripeToken({
        card: form.card,
        expirationDate: form.expirationDate,
        cvc: form.cvc,
      })
        .then(token => {
          this.submitToken(token);
          this.setState({
            errors: {},
          });
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
    const {loading} = this.props;
    const {form, errors, validate} = this.state;
    const {card, expirationDate, cvc} = form;

    const getFieldModificatorClass = field => ({
      'is-error': errors && errors[field],
      'is-valid': validate[field] && !(errors && errors[field]),
    });

    return (
      <div className="billing-form__fields">
        <div className="billing-form__card-number">
          <div
            className={classNames('Form-field', getFieldModificatorClass('card'))}>
            <MaskedTextInput
              disabled={loading}
              labelName="Card Number"
              mask={this.getCardMask(card)}
              name="card"
              onBlur={this.handleBlur.bind(this, 'card')}
              onChange={event => this.handleFieldChange('card', event.target.value)}
              value={card} />
            <img
              className="billing-form__valid-field-check"
              src={IconMarkGreen} />
            {validate.card && errors.card && <div className="Form-error">{errors.card}</div>}
          </div>
        </div>
        <div className="billing-form__expiration-date">
          <div className={classNames('Form-field', getFieldModificatorClass('expirationDate'))}>
            <MaskedTextInput
              className="FormControl--short"
              disabled={loading}
              labelName="Exp. Date"
              mask="99/99"
              name="expirationDate"
              onBlur={this.handleBlur.bind(this, 'expirationDate')}
              onChange={event => this.handleFieldChange('expirationDate', event.target.value)}
              placeholder="MM/YY"
              value={expirationDate} />
            <img
              className="billing-form__valid-field-check"
              src={IconMarkGreen} />
            {
              validate.expirationDate &&
              errors.expirationDate &&
              <div className="Form-error">{errors.expirationDate}</div>
            }
          </div>
        </div>
        <div className="billing-form__cvc">
          <div className={classNames('Form-field', getFieldModificatorClass('cvc'))}>
            <TextInput
              className="FormControl--short"
              disabled={loading}
              labelName="CVC"
              name="cvc"
              onBlur={this.handleBlur.bind(this, 'cvc')}
              onChange={(name, value) => this.handleFieldChange('cvc', value)}
              value={cvc} />
            <img
              className="billing-form__valid-field-check"
              src={IconMarkGreen} />
            {validate.cvc && errors.cvc && <div className="Form-error">{errors.cvc}</div>}
          </div>
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
    const {form, errors} = this.state;
    const {termsAccepted} = form;
    const {paymentMethod, quoteId, termsAndConditionsUrl, total, loading} = this.props;
    const classes = {
      'billing-form': true,
      'billing-form--with-payment-method-details': this.isQuoteApproved(),
      'billing-form--loading': loading,
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
                Credit card payments are subject to an additional {CARD_TRANSACTION_FEE} transaction fee.
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
                disabled={some(Object.values(errors)) || !termsAccepted || loading}
                size="large">
                {
                  loading ?
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
                onClick={this.handleFieldChange.bind(this, 'termsAccepted', !termsAccepted)}>
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
