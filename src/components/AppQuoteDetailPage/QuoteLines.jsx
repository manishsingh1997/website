import React from 'react';
import PropTypes from 'prop-types';
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
  renderCalcInfo() {
    const {asPDF} = this.props;
    const {quote} = this.state;
    const {
      'calc_input': {gates, sides},
    } = quote;
    return (
      <React.Fragment>
        <div className="page-break">{asPDF && <h4>Project Scope</h4>}
          <div className="quote-details__sides spacing before__is-24">
            {(sides || []).map(({description, distance, map_id: id, price}, index) => (
              <QuoteLine
                description={description}
                distance={distance}
                id={id}
                index={index}
                key={`side-${id}`}
                price={price}
                quote={quote}
                type="Side"/>
            ))}
          </div>
          <div>
            {(gates || []).map(({description, map_id: id, name, price}, index) => (
              <QuoteLine
                description={description}
                id={id}
                index={index}
                key={`gate-${id}`}
                name={name}
                price={price}
                quote={quote}
                type="Gate"/>
            ))}
          </div>
          {this.renderPolygons()}
        </div>
      </React.Fragment>
    );
  }
  renderPolygons() {
    const {quote} = this.state;
    const {
      'calc_input': {polygons},
    } = quote;
    return (
      <React.Fragment>
        <div>
          {(polygons || []).map(({description, area, map_id: id, price}, index) => (
            <QuoteLine
              area={area}
              description={description}
              id={id}
              index={index}
              key={`area-${id}`}
              name={name}
              price={price}
              quote={quote}
              type="Area"/>
          ))}
        </div>
      </React.Fragment>
    );
  }
  renderQuoteLines() {
    const {quote} = this.state;
    const quoteLines = quote['quote_lines'];
    // sides is alphabetical values A, B, ... , AA
    let sides = quoteLines.filter(line => isNaN(line['label'])).sort(line => line['label']);
    // gates is integer values 1,2 ..., 99
    let gates = quoteLines.filter(line => !isNaN(line['label'])).sort(line => parseInt(line['label'], 10));

    return (
      <React.Fragment>
        <div>
          {(sides || []).map(({cost, description, id, label, quantity, unit}) => (
            <QuoteLine
              cost={cost}
              description={description}
              id={id}
              key={`side-${id}`}
              label={label}
              quantity={quantity}
              quote={quote}
              type="Side"
              unit={unit}/>
          ))}
        </div>
        <div>
          {(gates || []).map(({cost, description, id, label}) => (
            <QuoteLine
              cost={cost}
              description={description}
              id={id}
              key={`gate-${id}`}
              label={label}
              quote={quote}
              type="Gate"/>
          ))}
        </div>
        {this.renderPolygons()}
      </React.Fragment>
    );
  }
  render() {
    const {quote} = this.props;
    return (
      <React.Fragment>
        {this.isVendorPreview() && quote['quote_lines']
          ? this.renderQuoteLines()
          : Boolean(quote['calc_input']) && this.renderCalcInfo()}
      </React.Fragment>);
  }
}
