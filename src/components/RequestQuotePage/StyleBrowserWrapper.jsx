import React from 'react';
import PropTypes from 'prop-types';
import {calcUtils, constants, StyleBrowser} from '@ergeon/3d-lib';
import {getPriceAndDescription, getCheckedZIP} from 'api/lead';

import './StyleBrowserWrapper.scss';
import PopUp from './PopUp';
const {getCatalogType} = calcUtils;

export default class StyleBrowserWrapper extends React.Component {
  static propTypes = {
    doneButtonText: PropTypes.string,
    initialSchemaCode: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
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
    const {model} = this.state;
    this.updatePrice(model);
    this.checkZipcode();
  }
  checkZipcode() {
    const {zipcode} = this.props;
    return getCheckedZIP(zipcode).then(response => {
      this.setState({productAvailability: response.data});
    });
  }
  updatePrice(modelString) {
    const {zipcode} = this.props;
    const modelState = calcUtils.getValueFromUrl(modelString);
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
  handleModelChange(modelString) {
    const {zipcode} = this.props;
    const {propertyConfig} = this.state;
    const modelState = calcUtils.getValueFromUrl(modelString);
    this.setState({
      model: modelString,
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
    const {price, model, description, productAvailability} = this.state;
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
