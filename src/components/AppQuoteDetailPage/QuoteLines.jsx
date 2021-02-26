import React from 'react';
import PropTypes from 'prop-types';

import {getLabelFromIndex} from '@ergeon/draw-map';

import {CALC_AREA_TYPE, CALC_GATE_TYPE, CALC_SIDE_TYPE} from 'website/constants';
import QuoteLine from './QuoteLine';

export default class QuoteLines extends React.Component {
  static propTypes = {
    asPDF: PropTypes.bool,
    isVendorPreview: PropTypes.bool,
    quote: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      quote: props.quote,
    };
  }

  isVendorPreview() {
    return this.props.isVendorPreview;
  }

  isQuoteLineOfMapKinds(quoteLine, types) {
    const catalog = quoteLine['catalog'];
    const quoteType = catalog && catalog['type'] && catalog['type']['map_kind'];
    return types.some(type => type === quoteType);
  }

  getTagsForQuoteLine(itemName) {
    const {quote} = this.state;
    const quoteLines = quote['quote_lines'];
    const quoteLine = quoteLines.find((quoteLine) =>
      !!quoteLine.label && quoteLine.label.toString() === itemName.toString()
    );
    let tags = [];

    if (quoteLine && quoteLine.config && quoteLine.config.tags) {
      tags = quoteLine.config.tags;
    }

    return tags;
  }

  renderCalcInfo(showPrice = true) {
    const {asPDF} = this.props;
    const {quote} = this.state;
    const {'calc_input': calcInput} = quote;
    let gates = [], sides = [], polygons = [];
    if (calcInput) {
      gates = calcInput.gates;
      sides = calcInput.sides;
      polygons = calcInput.polygons;
    }
    return (
      <React.Fragment>
        <div className="page-break">{asPDF && <h4>Project Scope</h4>}
          <div className="quote-details__sides spacing before__is-24">
            {(sides || []).map(({description, distance, map_id: id, price, approved_at: approvedAt}, index) => {
              const itemName = getLabelFromIndex(index);

              return (
                <QuoteLine
                  approvedAt={approvedAt}
                  description={description}
                  distance={distance}
                  id={id}
                  index={index}
                  isVendorPreview={this.isVendorPreview()}
                  key={`side-${id}`}
                  price={showPrice ? price: 0}
                  quote={quote}
                  tags={this.getTagsForQuoteLine(itemName)}
                  type={CALC_SIDE_TYPE}/>
              );
            }
            )}
          </div>
          <div>
            {(polygons || []).map(({description, area, map_id: id, price, approved_at: approvedAt, name}, index) => (
              <QuoteLine
                approvedAt={approvedAt}
                area={area}
                description={description}
                id={id}
                index={index}
                isVendorPreview={this.isVendorPreview()}
                key={`area-${id}`}
                name={name}
                price={showPrice ? price : 0}
                quote={quote}
                type={CALC_AREA_TYPE}/>
            ))}
          </div>
          <div>
            {(gates || []).map(({description, map_id: id, name, price, approved_at: approvedAt}, index) => (
              <QuoteLine
                approvedAt={approvedAt}
                description={description}
                id={id}
                index={index}
                isVendorPreview={this.isVendorPreview()}
                key={`gate-${id}`}
                name={name}
                price={showPrice ? price: 0}
                quote={quote}
                tags={this.getTagsForQuoteLine(index + 1)}
                type={CALC_GATE_TYPE}/>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderQuoteLines() {
    const {quote} = this.state;
    const quoteLines = quote['quote_lines'];

    const filterByField = this.isVendorPreview() ? 'display_to_installer':'display_to_customer';

    const sides = quoteLines
      .filter(quoteLine => this.isQuoteLineOfMapKinds(quoteLine, ['line']))
      .filter(quoteLine => quoteLine[filterByField] === true);
    const gates = quoteLines
      .filter(quoteLine => this.isQuoteLineOfMapKinds(quoteLine, ['point', null, undefined]))
      .filter(quoteLine => quoteLine[filterByField] === true);
    const areas = quoteLines
      .filter(quoteLine => this.isQuoteLineOfMapKinds(quoteLine, ['area']))
      .filter(quoteLine => quoteLine[filterByField] === true);

    return (
      <React.Fragment>
        <div>
          {(sides || []).map(({
            cost,
            description,
            id,
            label,
            quantity,
            unit,
            approved_at: approvedAt,
            quote_id: quoteLineQuoteId,
          }) => (
            <QuoteLine
              approvedAt={approvedAt}
              description={description}
              id={id}
              isVendorPreview={this.isVendorPreview()}
              key={`side-${id}`}
              label={label}
              price={cost}
              quantity={quantity}
              quote={quote}
              quoteLineQuoteId={quoteLineQuoteId}
              type={CALC_SIDE_TYPE}
              unit={unit}/>
          ))}
        </div>
        <div>
          {(areas || []).map(({cost, description, id, label, approved_at: approvedAt, quote_id: quoteLineQuoteId}) => (
            <QuoteLine
              approvedAt={approvedAt}
              description={description}
              id={id}
              isVendorPreview={this.isVendorPreview()}
              key={`gate-${id}`}
              label={label}
              price={cost}
              quote={quote}
              quoteLineQuoteId={quoteLineQuoteId}
              type={CALC_AREA_TYPE}/>
          ))}
        </div>
        <div>
          {(gates || []).map(
            (
              {cost, description, id, label, approved_at: approvedAt, quote_id: quoteLineQuoteId, catalog: {name}}
            ) => (
              <QuoteLine
                approvedAt={approvedAt}
                description={description}
                id={id}
                isVendorPreview={this.isVendorPreview()}
                key={`gate-${id}`}
                label={label}
                name={name}
                price={cost}
                quote={quote}
                quoteLineQuoteId={quoteLineQuoteId}
                type={CALC_GATE_TYPE}/>
            ))}
        </div>
      </React.Fragment>
    );
  }

  render() {
    const {quote} = this.props;
    if (this.isVendorPreview()) {
      if (quote['quote_lines'] && quote['quote_lines'].length) {
        return this.renderQuoteLines();
      }
      return this.renderCalcInfo(false);  // We don't know vendor cost in that case - don't show it (false)
    }
    return this.renderCalcInfo();
  }
}
