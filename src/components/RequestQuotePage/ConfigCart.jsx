import React from 'react';
import PropTypes from 'prop-types';
import {reduce} from 'lodash';

import {Button, Spinner} from '@ergeon/core-components';
import {constants, calcUtils} from '@ergeon/3d-lib';

import TextCollapse from 'components/RequestQuotePage/TextCollapse';
import InlineEditor from 'components/RequestQuotePage/InlineEditor';

import './ConfigCart.scss';
class ConfigCart extends React.Component {
  static propTypes = {
    addConfigFromSchema: PropTypes.func,
    configs: PropTypes.arrayOf(PropTypes.shape({
      preview: PropTypes.string,
      price: PropTypes.number,
      description: PropTypes.string,
      units: PropTypes.number,
    })),
    removeConfig: PropTypes.func.isRequired,
    updateConfig: PropTypes.func.isRequired,
    zipcode: PropTypes.string,
  };

  static defaultProps = {
    configs: [],
  };

  state = {
    showInlineEditor: false,
    inlineEditorIndex: -1,
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

  editConfig(index) {
    this.setState({
      showInlineEditor: true,
      inlineEditorIndex: index,
    });
  }

  removeConfig(index) {
    this.props.removeConfig(index);
  }

  onUnitsChange(index, event) {
    const {value} = event.target;
    const {configs} = this.props;

    this.props.updateConfig(index, {
      ...configs[index],
      units: value,
    });
  }

  onCloseEditorClick() {
    this.setState({
      showInlineEditor: false,
    });
  }

  onDoneEditorClick(editorModel, index = -1) {
    const {configs, zipcode} = this.props;
    const data = calcUtils.getValueFromUrl(editorModel);
    const schemaCode = calcUtils.getSchemaCodeFromState(data);

    this.setState({
      showInlineEditor: false,
      inlineEditorIndex: -1,
    });

    this.props.addConfigFromSchema({
      length: index !== -1 ? configs[index].units : 1,
      data,
      schemaCode,
      configs,
      zipcode,
    }, index);
  }

  onAddConfigClick() {
    this.setState({
      showInlineEditor: true,
      inlineEditorIndex: -1,
    });
  }

  renderDescription(config) {
    return <TextCollapse>{config.description}</TextCollapse>;
  }

  renderConfig(config, index) {
    const isFenceConfig = this.isItFence(config);
    const {showInlineEditor, inlineEditorIndex} = this.state;

    if (showInlineEditor && inlineEditorIndex === index) {
      return (
        <div key={config.id}>
          <InlineEditor
            initialConfig={`?${config.code}`}
            onClose={this.onCloseEditorClick.bind(this)}
            onDone={(editorModel) => this.onDoneEditorClick(editorModel, index)} />
          <hr />
        </div>
      );
    }

    return (
      <div key={config.id}>
        <div className="config-item">
          <div className="config-item__content">
            <div className="config-item__preview">
              {
                config.preview ?
                  <img src={config.preview}/> :
                  <Spinner active={true} borderWidth={.15} color="green" size={64} />
              }
            </div>
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
                  <Button className="edit-config-button" onClick={this.editConfig.bind(this, index)}>Edit</Button>
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
    const {showInlineEditor, inlineEditorIndex} = this.state;

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
        {(showInlineEditor && inlineEditorIndex === -1) ? <InlineEditor
          onClose={this.onCloseEditorClick.bind(this)}
          onDone={this.onDoneEditorClick.bind(this)} /> : null}
        <div className="config-cart__resume">
          <Button
            asAnchor
            class="AddConfigButton"
            flavor="regular"
            onClick={this.onAddConfigClick.bind(this)}
            taste="line">
            Add a config
          </Button>
          <div className="config-cart__total">
            Total: ~${Math.round(this.getTotal())}
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

export default ConfigCart;
