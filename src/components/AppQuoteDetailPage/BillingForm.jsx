import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Button} from '@ergeon/core-components';

import {
  cardNumberValidation,
  cardExpDateValidation,
  cardCvcValidation,
  getStripeToken,
} from 'utils/billing';
import config from 'website/config';

import MaskedTextInput from 'components/common/MaskedTextInput';
import TextInput from 'components/common/TextInput';

import IconCards from 'assets/icon-cards.png';
import IconSSL from 'assets/icon-ssl.svg';
import IconCardSecure from 'assets/icon-card-secure.svg';
import IconMarkGreen from 'assets/icon-check-mark.svg';

import './BillingForm.scss';

export default class BillingForm extends React.Component {
  static propTypes = {
    houseId: PropTypes.number,
    onSubmit: PropTypes.func,
    paymentMethod: PropTypes.object,
    quoteId: PropTypes.number,
    termsAndConditionsUrl: PropTypes.string,
    total: PropTypes.string,
  };

  state = {
    loading: false,
    editMode: false,
    form: {
      termsAccepted: false,
      card: '',
      expirationDate: '',
      cvc: '',
    },
    validate: {},
  };

  isUsingCurrentPaymentMethod() {
    const {paymentMethod} = this.props;
    const {editMode} = this.state;

    return paymentMethod && !editMode;
  }

  getFormErrors(form, validate = {card: true, expirationDate: true, cvc: true}) {
    const {card, expirationDate, cvc} = form;
    let errors = null;

    if (this.isUsingCurrentPaymentMethod()) {
      return null;
    }

    if (validate.card && cardNumberValidation(card)) {
      errors = {
        ...errors,
        card: cardNumberValidation(card),
      };
    }

    if (validate.expirationDate && cardExpDateValidation(expirationDate)) {
      errors = {
        ...errors,
        expirationDate: cardExpDateValidation(expirationDate),
      };
    }

    if (validate.cvc && cardCvcValidation(cvc)) {
      errors = {
        ...errors,
        cvc: cardCvcValidation(cvc),
      };
    }

    return errors;
  }

  submitToken = (token) => {
    const {houseId} = this.props;

    this.props.onSubmit && this.props.onSubmit({
      'stripe_token': token,
      'house': houseId,
    }, this.isUsingCurrentPaymentMethod());
  };

  handleFieldChange(name, value) {
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
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
    const {form} = this.state;
    const errors = this.getFormErrors(form);

    event.preventDefault();

    if (!errors && form.termsAccepted) {
      getStripeToken({
        number: form.card,
        exp: form.expirationDate,
        cvc: form.cvc,
      }).then(token => this.submitToken(token));
    }
  }

  handleEditClick(event) {
    const {editMode} = this.state;

    event.preventDefault();

    this.setState({editMode: !editMode});
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
    const {loading, form, validate} = this.state;
    const {card, expirationDate, cvc} = form;
    const errors = this.getFormErrors(form, validate);

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
              mask="9999 9999 9999 9999"
              name="card"
              onBlur={this.handleBlur.bind(this, 'card')}
              onChange={event => this.handleFieldChange('card', event.target.value)}
              value={card} />
            <img
              className="billing-form__valid-field-check"
              src={IconMarkGreen} />
            {errors && errors.card && <div className="Form-error">{errors.card}</div>}
          </div>
        </div>
        <div className="billing-form__expiration-date">
          <div className={classNames('Form-field', getFieldModificatorClass('expirationDate'))}>
            <MaskedTextInput
              className="FormControl--short"
              disabled={loading}
              labelName="Exp. Date"
              mask="99/9999"
              name="expirationDate"
              onBlur={this.handleBlur.bind(this, 'expirationDate')}
              onChange={event => this.handleFieldChange('expirationDate', event.target.value)}
              placeholder="MM/YYYY"
              value={expirationDate} />
            <img
              className="billing-form__valid-field-check"
              src={IconMarkGreen} />
            {errors && errors.expirationDate && <div className="Form-error">{errors.expirationDate}</div>}
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
            {errors && errors.cvc && <div className="Form-error">{errors.cvc}</div>}
          </div>
        </div>
      </div>
    );
  }

  renderPaymentMethodDetails() {
    const {paymentMethod} = this.props;
    return (
      <div className="billing-form__payment-method-details">
        <div className="billing-form__payment-method-details-item">
          <div className="billing-form__payment-method-details-item-name">
            Card number
          </div>
          <div className="billing-form__payment-method-details-item-value">
            {paymentMethod && paymentMethod['card_last_digits']}
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
    const {form} = this.state;
    const {termsAccepted} = form;
    const {quoteId, termsAndConditionsUrl, total, paymentMethod} = this.props;

    return (
      <form className="billing-form" onSubmit={this.handleSubmit.bind(this)}>
        <div className="billing-form__content">
          <div className="billing-form__title-section">
            <h4>
              Billing Information
              {paymentMethod && this.renderEditOrCancelButton()}
            </h4>
            <div className="billing-form__icons">
              <img className="billing-form__icon-cards" src={IconCards}/>
              <img className="billing-form__icon-secure" src={IconSSL}/>
            </div>
          </div>
          {
            this.isUsingCurrentPaymentMethod() ?
              this.renderPaymentMethodDetails() :
              this.renderFormFields()
          }
          <div className="billing-form__card-disclaimer">
            <img className="billing-form__card-disclaimer-icon" src={IconCardSecure} />
            <div className="billing-form__card-disclaimer-text">
              You <b>will not be charged</b> until after your service is completed.
              Credit card payments are subject to an additional {config.CARD_TRANSACTION_FEE} transaction fee.
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
              disabled={this.getFormErrors(form) || !termsAccepted}
              size="large">
              Approve and place order
            </Button>
          </div>
          <a
            className="billing-form__request-changes"
            href={`mailto:${config.CONTACT_EMAIL}?subject=Quote change request: ${quoteId}`}>
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
    );
  }
}