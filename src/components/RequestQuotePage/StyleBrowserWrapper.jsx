import React from 'react';
import PropTypes from 'prop-types';
import {calcUtils, constants, StyleBrowser} from '@ergeon/3d-lib';
import {getPriceAndDescription, getCheckedZIP} from 'api/lead';
import config from 'website/config';
import {tawk} from '@ergeon/erg-utms';

import './StyleBrowserWrapper.scss';
import PopUp from './PopUp';
const {getCatalogType} = calcUtils;

export default class StyleBrowserWrapper extends React.Component {
  static propTypes = {
    doneButtonText: PropTypes.string,
    initialSchemaCode: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    onLoaded: PropTypes.func.isRequired,
    zipcode: PropTypes.string,
  };
  static defaultProps = {
    initialSchemaCode: constants.defaultFenceCode,
  };
  state = {
    model: this.props.initialSchemaCode,
    description: '',
    price: 0,
  };

  componentDidMount() {
    tawk.tawkAPILoader.then(TawkAPI => TawkAPI.hideWidget());
    const {model} = this.state;
    this.updatePrice(model);
    this.checkZipcode();
  }
  componentWillUnmount() {
    tawk.tawkAPILoader.then(TawkAPI => TawkAPI.showWidget());
  }
  checkZipcode() {
    const {zipcode, onLoaded} = this.props;
    return getCheckedZIP(zipcode).then(response => {
      onLoaded();
      this.setState({productAvailability: response.data});
    });
  }
  updatePrice(modelString) {
    const {zipcode} = this.props;
    const modelState = calcUtils.getValueFromUrl(modelString);
    this.setState({moreStylesUrl: this.getFencequotingUrl(modelString, zipcode)});
    return getPriceAndDescription(modelState, zipcode)
      .then(data => {
        this.setState({
          price: this.getPriceRow(modelState, data['unit_price']),
          description: data.description});
      });
  }

  onEditorModelChange(model) {
    this.setState({model});
    this.updatePrice(model);
  }

  isFence(modelState) {
    return getCatalogType(modelState) === constants.CATALOG_TYPE_FENCE;
  }
  getPriceRow(modelState, unitPrice) {
    unitPrice = Math.floor(unitPrice);
    const row = this.isFence(modelState) ? `Fence Estimate: $${unitPrice}/ft` : `Gate Estimate: ~$${unitPrice}`;
    return row;
  }
  getFencequotingUrl(schemaCode, zipCode) {
    schemaCode = schemaCode.replace('?', '');
    return `${config.fencequotingHost}/fence3d?${schemaCode}&mode=3d&options=true&zipcode=${zipCode}`;
  }
  handleModelChange(modelString) {
    const {zipcode} = this.props;
    const {propertyConfig} = this.state;
    const modelState = calcUtils.getValueFromUrl(modelString);
    this.setState({
      model: modelString,
      moreStylesUrl: this.getFencequotingUrl(modelString, zipcode),
    });
    getPriceAndDescription(modelState, zipcode, propertyConfig)
      .then(data => {
        this.setState({
          price: this.getPriceRow(modelState, data['unit_price']),
          description: data.description,
          error: null,
        });
      })
      .catch(error => {
        this.setState({
          price: '',
          description: '',
          error: 'Connection error',
        });
        console.error(error);
      });
  }

  handleSelectionCompleted(model) {
    const {onDone} = this.props;
    onDone && onDone(model);
  }
  render() {
    const {price, model, description, productAvailability, moreStylesUrl} = this.state;
    return (
      <div className="style-browser-wrapper">
        <PopUp
          onHide={() => this.props.onClose()}
          visible={true}>
          <div>
            <div className="style-browser-wrapper__title">
              <span className="label uppercase">Design your Fence or Gate</span>
            </div>
            <StyleBrowser
              compactView={true}
              description={description}
              doneButtonText={this.props.doneButtonText}
              model={model}
              moreStylesUrl={moreStylesUrl}
              onChange={(model) => this.handleModelChange(model)}
              onComplete={(model) => this.handleSelectionCompleted(model)}
              price={price}
              productAvailability={productAvailability}/>
          </div>

        </PopUp>
      </div>
    );
  }
}