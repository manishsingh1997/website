import React from 'react';
import PropTypes from 'prop-types';
import {getLabelFromIndex} from '@ergeon/draw-map';
import MapLabel from './MapLabel';
import {DRIVEWAY_QUANTITY_UNIT, FENCE_QUANTITY_UNIT} from '../../website/constants';
import {formatPrice} from '../../utils/app-order';
import AppConfigPreview from '../common/AppConfigPreview';

export default class QuoteLine extends React.Component {
  static propTypes = {
    area: PropTypes.number,
    cost: PropTypes.number,
    description: PropTypes.string,
    distance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.string,
    index: PropTypes.number,
    label: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.string,
    quote: PropTypes.object,
    type: PropTypes.oneOf(['Side', 'Gate', 'Area']),
    unit: PropTypes.string,
  };
  getQuoteLineForCalcInputItem(quoteLines, itemName) {
    if (!itemName) {
      return undefined;
    }
    return quoteLines.find((quoteLine) => !!quoteLine.label && quoteLine.label.toString() === itemName.toString());
  }
  get indexLabel() {
    const {index, label} = this.props;
    return label ? label : getLabelFromIndex(index);
  }
  renderSideTitle() {
    return (
      <React.Fragment>
        <MapLabel isInline={true} name={this.indexLabel} type="Label" />
        <h5>Side {this.indexLabel}</h5>
      </React.Fragment>
    );
  }
  renderPointTitle() {
    const {index, name, label} = this.props;
    return (
      <React.Fragment>
        <MapLabel name={label ? label : index + 1} type="Circle" />
        <h5>{label ? `Gate ${label}` : name}</h5>
      </React.Fragment>
    );
  }
  renderAreaTitle() {
    const {index} = this.props;
    return (
      <React.Fragment>
        <MapLabel name={getLabelFromIndex(index)} type="LabelYellow" />
        <h5>Area {getLabelFromIndex(index)}</h5>
      </React.Fragment>
    );
  }
  renderTitle() {
    const {type} = this.props;
    const getTitle = () => {
      if (type === 'Side') return this.renderSideTitle();
      if (type === 'Gate') return this.renderPointTitle();
      if (type === 'Area') return this.renderAreaTitle();
      return null;
    };
    return (
      <div className="quote-line__title spacing after__is-12">
        {getTitle()}
      </div>);
  }
  renderQuotePreview(quoteLine, useNoPreviewIcon = false, usePlaceHolder = false) {
    const {order: {house: {address: {zip_code: zipCode}}}} = this.props.quote;
    const schemaCodeUrl = quoteLine && quoteLine['config']['schema_code_url'];
    const propertyData = quoteLine && quoteLine['property_config'] && quoteLine['property_config']['schema_code_url'];
    const propertySchemaCodeUrl = propertyData && propertyData.replace(
      'schema', 'property_schema').replace('code', 'property_code');
    return (
      <AppConfigPreview
        className="quote-line-preview"
        propertySchemaCodeUrl={propertySchemaCodeUrl}
        schemaCodeUrl={usePlaceHolder ? null : schemaCodeUrl}
        useNoPreviewIcon={useNoPreviewIcon}
        withLink={Boolean(schemaCodeUrl)}
        zipCode={zipCode}/>
    );
  }

  renderPreviewForCalcInfo() {
    const {quote, type, index, name} = this.props;
    if (type === 'Side') return (
      this.renderQuotePreview(
        this.getQuoteLineForCalcInputItem(quote['quote_lines'], this.indexLabel)
      )
    );
    if (type === 'Area') return (
      this.renderQuotePreview(
        null,
        false,
        true,
      )
    );
    if (type === 'Gate') return (
      this.renderQuotePreview(
        this.getQuoteLineForCalcInputItem(quote['quote_lines'], index + 1),
        name === '!' || name === 'Complications',
      )
    );
    return null;
  }

  renderPreviewForQuoteLine() {
    const {quote, type, label, name} = this.props;
    if (type === 'Side') return (
      this.renderQuotePreview(
        this.getQuoteLineForCalcInputItem(quote['quote_lines'], label)
      )
    );
    if (type === 'Gate') return (
      this.renderQuotePreview(
        this.getQuoteLineForCalcInputItem(quote['quote_lines'], label),
        name === '!' || name === 'Complications',
      )
    );
    return null;
  }

  render() {
    const {id, area, distance, description, label, price, cost, quantity, unit} = this.props;
    return (
      <div className="quote-line" key={`side-${id}`}>
        <div>
          <div>
            {label ? this.renderPreviewForQuoteLine() : this.renderPreviewForCalcInfo()}
          </div>
        </div>
        <div className="quote-line-description">
          {this.renderTitle()}
          <div>
            {description}
          </div>
        </div>
        <div className="quote-line-price">
          <div className="mobile-length spacing before__is-12 after__is-12">
            {distance && <span>Length: {distance} {FENCE_QUANTITY_UNIT}</span>}
            {quantity && unit && <span>Length: {Math.round(quantity)} {unit}.</span>}
            {area && <span>Area: {area} {DRIVEWAY_QUANTITY_UNIT}</span>}
          </div>
          {price && <h5>{formatPrice(price)}</h5>}
          {cost && <h5>{formatPrice(cost)}</h5>}
          <div className="desktop-length spacing before__is-12">
            {distance && <span>Length: {distance} {FENCE_QUANTITY_UNIT}</span>}
            {quantity && unit && <span>Length: {Math.round(quantity)} {unit}.</span>}
            {area && <span>Area: {area} {DRIVEWAY_QUANTITY_UNIT}</span>}
          </div>
        </div>
      </div>);
  }
}
