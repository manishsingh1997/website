import React from 'react';
import PropTypes from 'prop-types';
import {reduce} from 'lodash';

import {Button, Spinner} from '@ergeon/core-components';
import {constants, calcUtils} from '@ergeon/3d-lib';
import {ReactSVG} from 'react-svg';
import iconPlus from '../../assets/icon-plus.svg';
import classNames from 'classnames';
import StyleBrowserWrapper from './StyleBrowserWrapper';

import './ConfigCart.scss';
class ConfigCart extends React.Component {
  static propTypes = {
    addConfigFromSchema: PropTypes.func,
    configs: PropTypes.arrayOf(PropTypes.shape({
      preview: PropTypes.string,
      price: PropTypes.string,
      description: PropTypes.string,
      units: PropTypes.number,
      code: PropTypes.object,
    })),
    onShowStyleBrowserChange: PropTypes.func.isRequired,
    removeConfig: PropTypes.func.isRequired,
    showStyleBrowser: PropTypes.bool,
    updateConfig: PropTypes.func.isRequired,
    zipcode: PropTypes.string,
  };

  static defaultProps = {
    configs: [],
    showStyleBrowser: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      showStyleBrowser: props.showStyleBrowser,
      styleBrowserIndex: -1,
    };
  }

  componentDidUpdate() {
    if (this.props.showStyleBrowser !== this.state.showStyleBrowser) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({showStyleBrowser: this.props.showStyleBrowser});
    }
  }

  scrollToNode(node) {
    node.scrollIntoView({behavior: 'smooth'});
  }

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
      showStyleBrowser: true,
      styleBrowserIndex: index,
    });
    this.props.onShowStyleBrowserChange(true);
  }

  removeConfig(index) {
    this.props.removeConfig(index);
  }

  onUnitsChange(index, event) {
    const {value} = event.target;
    const {configs} = this.props;
    const config = configs[index];
    this.props.updateConfig(index, {
      ...config,
      units: Math.max(Number(value) || 1, 1).toString(),
    });
  }

  onCloseEditorClick() {
    this.setState({
      showStyleBrowser: false,
      styleBrowserLoaded: false,
    });
    this.props.onShowStyleBrowserChange(false);
  }

  onDoneEditorClick(editorModel, index = -1) {
    const {configs, zipcode} = this.props;
    const schemaCode = calcUtils.getSchemaCodeFromState(editorModel);

    this.setState({
      showStyleBrowser: false,
      styleBrowserIndex: -1,
      styleBrowserLoaded: false,
    });
    this.props.onShowStyleBrowserChange && this.props.onShowStyleBrowserChange(false);
    this.scrollToNode(this.configCardRef);
    const config = configs[index];
    this.props.addConfigFromSchema({
      length: index !== -1 ? config.units : 1,
      data: editorModel,
      schemaCode,
      configs,
      zipcode,
    }, index);
  }

  onAddConfigClick() {
    this.setState({
      showStyleBrowser: true,
      styleBrowserIndex: -1,
    });
    this.props.onShowStyleBrowserChange && this.props.onShowStyleBrowserChange(true);
  }

  onStyleBrowserLoaded() {
    this.setState({styleBrowserLoaded: true});
  }

  renderDescription(config) {
    return config.description;
  }

  renderConfig(config, index) {
    const isFenceConfig = this.isItFence(config);

    return (
      <div key={config.id}>
        <div className="config-item">
          <div className="config-item__content">
            <div className="config-item__preview">
              {
                config.preview ?
                  <img src={config.preview}/> :
                  <Spinner active={true} borderWidth={.2} color="green" size={48} />
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
              <div className="config-item__internal-wrapper">
                <div className="config-item__description">
                  {this.renderDescription(config)}
                </div>
                <div className="config-item__preview__in-description">
                  {
                    config.preview ?
                      <img src={config.preview}/> :
                      <Spinner active={true} borderWidth={.2} color="green" size={36} />
                  }
                </div>
              </div>
              <div className="config-item__actions">
                <div className="config-item__buttons">
                  <Button
                    flavor="regular"
                    onClick={() => this.editConfig(index)}
                    size="small"
                    taste="line">Edit</Button>
                  <Button
                    className="delete-config-button"
                    flavor="attention"
                    onClick={() => this.removeConfig(index)}
                    size="small"
                    taste="boundless">Delete</Button>
                </div>
                {
                  isFenceConfig &&
                  <div className="config-item__length-field">
                    <span className="config-item__length-label">Length:</span>
                    <input min="1" onChange={this.onUnitsChange.bind(this, index)} type="number" value={config.units} />
                    <span className="config-item__length-field-unit">ft</span>
                  </div>
                }
                {
                  !isFenceConfig &&
                  <div className="config-item__length-field">
                    <span className="config-item__length-label">Count:</span>
                    <input
                      className="unit-input"
                      min="1"
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

  renderStyleBrowser() {
    const {styleBrowserIndex} = this.state;
    const {configs} = this.props;
    const config = styleBrowserIndex !== -1 ? configs[styleBrowserIndex] : undefined;
    const schemaCode = config? `?${config?.code}` : undefined;
    const doneButtonText = styleBrowserIndex === -1? 'Add to order' : 'Save changes';
    const DEFAULT_FENCE_SIDE_LENGTH = 6;
    return (
      <StyleBrowserWrapper
        doneButtonText={doneButtonText}
        fenceSideLength={Number(config?.units || DEFAULT_FENCE_SIDE_LENGTH)}
        initialSchemaCode={schemaCode}
        onClose={() => this.onCloseEditorClick()}
        onDone={(editorModel) => this.onDoneEditorClick(editorModel, styleBrowserIndex)}
        onLoaded={() => this.onStyleBrowserLoaded()}
        zipcode={this.props.zipcode}/>
    );
  }

  render() {
    const {configs} = this.props;
    const {showStyleBrowser, styleBrowserIndex, styleBrowserLoaded} = this.state;
    const styleBrowserContainerClasses = classNames({
      'style-browser-loader' : true,
      'loaded' : styleBrowserLoaded,
    });
    const styleBrowserPreloaderClasses = classNames({
      'style-browser-preloader' : true,
      'loaded' : styleBrowserLoaded,
      'show' : showStyleBrowser,
    });
    return (
      <React.Fragment>
        <div>
          <div className={styleBrowserPreloaderClasses}>
            <Spinner active={!styleBrowserLoaded} borderWidth={0.16} color="white" size={64}/>
          </div>
          {(showStyleBrowser)
            ? <div className={styleBrowserContainerClasses}>{this.renderStyleBrowser()}</div>
            : null
          }
        </div>
        <div className="config-cart__wrapper">
          <div className="config-cart" ref={(node) => this.configCardRef = node}>
            <div className="config-cart__title">
              <h4>Selected configurations</h4>
            </div>
            <div className="config-cart__list">
              {configs.map((config, index) => this.renderConfig(config, index))}
              {
                !configs.length &&
                  <div>
                    <div className="config-cart__no-config-title">
                      You didn&apos;t add any fence or gate configuration
                    </div>
                    <div className="config-cart__no-config-description">Add a config to send with quote request</div>
                    <hr />
                  </div>
              }
            </div>
            <div className="config-cart__resume">
              <Button
                asAnchor={!(showStyleBrowser && styleBrowserIndex === -1)}
                className="add-config-button"
                disabled={showStyleBrowser && styleBrowserIndex === -1}
                flavor="regular"
                onClick={this.onAddConfigClick.bind(this)}
                size="large"
                taste="line">
                <ReactSVG className="spacing right__is-5"  src={iconPlus}/>Add a config
              </Button>
              <div className="config-cart__total">
                {this.getTotal() ? `Total estimate: ~$${Math.round(this.getTotal())}` : null}
              </div>
            </div>
            <div className="config-cart__disclaimer">
              The price shown are for informational purposes only.
              Actual prices may vary with project complexity, material price fluctuations and additional options.
              Contact us to speak to an expert and get a personalized full quote.
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConfigCart;
