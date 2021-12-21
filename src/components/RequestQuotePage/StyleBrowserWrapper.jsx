import React from 'react';
import PropTypes from 'prop-types';
import {CatalogType, calcUtils, constants, StyleBrowser} from '@ergeon/3d-lib';
import {getPriceAndDescription, getCheckedZIP} from 'api/lead';
import {tawk} from '@ergeon/erg-utms';
import {getFencequotingURL} from '../../utils/urls';

import './StyleBrowserWrapper.scss';
import PopUp from './PopUp';
const {getCatalogType} = calcUtils;

export default class StyleBrowserWrapper extends React.Component {
  static propTypes = {
    doneButtonText: PropTypes.string,
    fenceSideLength: PropTypes.number,
    initialSchemaCode: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    onLoaded: PropTypes.func.isRequired,
    showLoadingError: PropTypes.func.isRequired,
    zipcode: PropTypes.string,
  };

  static defaultProps = {
    fenceSideLength: 6,
    initialSchemaCode: constants.defaultFenceCode,
  };

  state = {
    model: this.props.initialSchemaCode,
    description: '',
    priceRow: '',
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

  getMoreStylesURL(modelString) {
    const {zipcode, fenceSideLength} = this.props;
    return getFencequotingURL(modelString.replace('?', ''), zipcode, fenceSideLength);
  }

  checkZipcode() {
    const {zipcode, onLoaded} = this.props;
    return getCheckedZIP(zipcode).then(response => {
      onLoaded();
      this.setState({productAvailability: response.data});
    });
  }

  updatePrice(modelString) {
    const {zipcode, showLoadingError} = this.props;
    const modelState = calcUtils.getValueFromUrl(modelString);
    this.setState({
      moreStylesUrl: this.getMoreStylesURL(modelString),
    });
    return getPriceAndDescription(modelState, zipcode)
      .then(data => {
        if (data) {
          this.setState({
            priceRow: this.getPriceRow(modelState, data['unit_price']),
            description: data.description});
        } else {
          showLoadingError();
        }
      });
  }

  onEditorModelChange(model) {
    this.setState({model});
    this.updatePrice(model);
  }

  isFence(modelState) {
    return getCatalogType(modelState) === CatalogType.FENCE;
  }

  getPriceRow(modelState, unitPrice) {
    unitPrice = Math.floor(unitPrice);
    const row = this.isFence(modelState) ? `Fence Estimate: $${unitPrice}/ft` : `Gate Estimate: ~$${unitPrice}`;
    return row;
  }

  handleModelChange(modelString) {
    const {zipcode} = this.props;
    const {propertyConfig} = this.state;
    const modelState = calcUtils.getValueFromUrl(modelString);
    this.setState({
      model: modelString,
      moreStylesUrl: this.getMoreStylesURL(modelString),
    });
    getPriceAndDescription(modelState, zipcode, propertyConfig)
      .then(data => {
        if (data) {
          this.setState({
            priceRow: this.getPriceRow(modelState, data['unit_price']),
            description: data.description,
            error: null,
          });
        }
      })
      .catch(error => {
        this.setState({
          priceRow: '',
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
    const {priceRow, model, description, productAvailability, moreStylesUrl} = this.state;
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
              citiesUrl={process.env.CITIES_URL}
              compactView={true}
              description={description}
              doneButtonText={this.props.doneButtonText}
              model={model}
              moreStylesUrl={moreStylesUrl}
              onChange={(model) => this.handleModelChange(model)}
              onComplete={(model) => this.handleSelectionCompleted(model)}
              price={priceRow}
              productAvailability={productAvailability}/>
          </div>

        </PopUp>
      </div>
    );
  }
}
