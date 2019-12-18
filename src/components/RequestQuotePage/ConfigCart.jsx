import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {reduce} from 'lodash';

import {Button} from '@ergeon/core-components';
import {constants} from '@ergeon/3d-lib';

import config from 'website/config';
import {actionTriggers} from 'actions/cart-actions';
import TextCollapse from 'components/RequestQuotePage/TextCollapse';

import './ConfigCart.scss';
class ConfigCart extends React.Component {
  static propTypes = {
    configs: PropTypes.arrayOf(PropTypes.shape({
      preview: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      units: PropTypes.number,
    })),
    dispatch: PropTypes.func,
  };

  static defaultProps = {
    configs: [],
  };

  getTotal() {
    return reduce(
      this.props.configs,
      (total, {price, units}) => total + price * units,
      0
    );
  }

  isItFence(config) {
    const {CATALOG_TYPE_FENCE} = constants;
    return config.catalog_type === CATALOG_TYPE_FENCE;
  }

  removeConfig(index) {
    this.props.dispatch(actionTriggers.removeConfig(index));
  }

  onUnitsChange(index, event) {
    const {value} = event.target;
    const {configs} = this.props;

    this.props.dispatch(actionTriggers.updateConfig(index, {
      ...configs[index],
      units: value,
    }));
  }

  renderDescription(config) {
    return <TextCollapse>{config.description}</TextCollapse>;
  }

  renderConfig(config, index) {
    const isFenceConfig = this.isItFence(config);
    return (
      <div>
        <div className="config-item">
          <div className="config-item__content">
            <img className="config-item__preview" src={config.preview}/>
            <div className="config-item__info">
              <div className="config-item__title">
                <span>{isFenceConfig ? 'Fence' : 'Gate'}</span>
                <span className="config-item__length">
                  {
                    isFenceConfig &&
                    (
                      <div className="config-item__price">
                        ~${Math.round(config.price)}/ft
                      </div>
                    )
                  }
                  {
                    !isFenceConfig &&
                    <div className="config-item__price">
                      ~${Math.round(config.price)}
                    </div>
                  }
                </span>
              </div>
              <div className="config-item__description">
                {this.renderDescription(config)}
              </div>
              <div className="config-item__actions">
                <div className="config-item__buttons">
                  <Button className="delete-config-button" onClick={this.removeConfig.bind(this, index)}>Delete</Button>
                </div>
                {
                  isFenceConfig &&
                  <div className="config-item__length-field">
                    <span className="config-item__length-label">Length:</span>
                    <input min="0" onChange={this.onUnitsChange.bind(this, index)} type="number" value={config.units} />
                    <span className="config-item__length-field-unit">ft</span>
                  </div>
                }
                {
                  !isFenceConfig &&
                  <div className="config-item__length-field">
                    <span className="config-item__length-label">Count:</span>
                    <input
                      className="unit-input"
                      min="0"
                      onChange={this.onUnitsChange.bind(this, index)}
                      type="number"
                      value={config.units} />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }

  render() {
    const {configs} = this.props;
    return (
      <div className="config-cart">
        <div className="config-cart__list">
          {configs.map(this.renderConfig.bind(this))}
          {
            !configs.length &&
            <div>
              <div className="config-cart__no-config-title">You didn&apos;t add any fence or gate configuration</div>
              <div className="config-cart__no-config-description">Add a config to send with quote request</div>
              <hr />
            </div>
          }
        </div>
        <div className="config-cart__resume">
          {
            !configs.length && <Button
              asAnchor
              class="AddConfigButton"
              flavor="regular"
              href={`${config.fencequotingHost}/calculator` /* TODO: Button should show inline editor */}
              taste="line">
              Add a config
            </Button>
          }
          <div className="config-cart__total">
            Total estimate: ~${Math.round(this.getTotal())}
          </div>
        </div>
        <div className="config-cart__disclaimer">
          The price shown are for informational purposes only.
          Actual prices may vary with project complexity, material price fluctuations and additional options.
          Contact us to speak to an expert and get a personalied full quote.
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    configs: state.cart.configs,
  };
})(ConfigCart);