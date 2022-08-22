import React from 'react';

import {reduce} from 'lodash';
import {Button, Input, Spinner} from '@ergeon/core-components';
import {calcUtils, CatalogType} from '@ergeon/3d-lib';
import {ReactSVG} from 'react-svg';
import classNames from 'classnames';

import iconPlus from '../../assets/icon-plus.svg';
import {getFencequotingURL} from '../../utils/urls';
import LoadingErrorModal from '../common/ErroredLoadingModal';

import StyleBrowserWrapper from './components/StyleBrowserWrapper';
import {Config, LeadConfigType} from './types';
import {getConfigName} from './utils';
import './ConfigCart.scss';

type ConfigCartProps = {
  addConfigFromSchema: (config: LeadConfigType, index: number) => void;
  configs: Config[];
  onShowStyleBrowserChange: (show: boolean) => void;
  removeConfig: (index: number) => void;
  showStyleBrowser: boolean;
  updateConfig: (index: number, config: Config) => void;
  zipcode: string;
};

type ConfigCartState = {
  showStyleBrowser: boolean;
  styleBrowserIndex: number;
  isLoadingModalErrored: boolean;
  styleBrowserLoaded: boolean;
};

class ConfigCart extends React.Component<ConfigCartProps, ConfigCartState> {
  configCardRef!: HTMLDivElement | null;

  constructor(props: ConfigCartProps) {
    super(props);
    this.state = {
      showStyleBrowser: props.showStyleBrowser,
      styleBrowserIndex: -1,
      isLoadingModalErrored: false,
      styleBrowserLoaded: false,
    };

    this.showLoadingError = this.showLoadingError.bind(this);
    this.closeLoadingError = this.closeLoadingError.bind(this);
  }

  componentDidUpdate() {
    if (this.props.showStyleBrowser !== this.state.showStyleBrowser) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({showStyleBrowser: this.props.showStyleBrowser});
    }
  }

  scrollToNode(node: HTMLDivElement | null) {
    node && node.scrollIntoView({behavior: 'smooth'});
  }

  getTotal() {
    return reduce(this.props.configs, (total, {price, units}) => total + parseInt(price, 10) * units, 0);
  }

  isItGate(config: Config) {
    return config.catalog_type === CatalogType.GATE;
  }

  editConfig(index: number) {
    this.setState({
      showStyleBrowser: true,
      styleBrowserIndex: index,
    });
    this.props.onShowStyleBrowserChange(true);
  }

  removeConfig(index: number) {
    this.props.removeConfig(index);
  }

  onUnitsChange(value: string, index: number) {
    const {configs} = this.props;
    const config = configs[index];
    this.props.updateConfig(index, {...config, units: Number(value)});
  }

  onCloseEditorClick() {
    this.setState({
      showStyleBrowser: false,
      styleBrowserLoaded: false,
    });
    this.props.onShowStyleBrowserChange(false);
  }

  onDoneEditorClick(schemaCode: string, index = -1) {
    const {configs, zipcode} = this.props;
    const modelState = calcUtils.getValueFromUrl(schemaCode);

    this.setState({
      showStyleBrowser: false,
      styleBrowserIndex: -1,
      styleBrowserLoaded: false,
    });
    this.props.onShowStyleBrowserChange && this.props.onShowStyleBrowserChange(false);
    this.scrollToNode(this.configCardRef);
    const config = configs[index];
    this.props.addConfigFromSchema(
      {
        length: index !== -1 ? config.units : 1,
        grade: index !== -1 ? config.grade : 0,
        data: modelState,
        schemaCode,
        configs,
        zipcode,
      },
      index
    );
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

  showLoadingError() {
    this.setState(() => ({isLoadingModalErrored: true}));
  }

  closeLoadingError() {
    const {onShowStyleBrowserChange} = this.props;
    this.setState(() => ({isLoadingModalErrored: false}));
    onShowStyleBrowserChange(false);
  }

  renderDescription(config: Config) {
    const description = config.description || 'Cannot get data';
    return description;
  }

  renderConfig(config: Config, index: number) {
    const {zipcode} = this.props;
    const DEFAULT_FENCE_SIDE_LENGTH = 6;
    const isGateConfig = this.isItGate(config);
    const length = (config?.units || DEFAULT_FENCE_SIDE_LENGTH).toString();
    const priceText = isGateConfig
      ? `~${Math.round(parseInt(config.price, 10))}`
      : `~${Math.round(parseInt(config.price, 10))}/ft`;

    return (
      <div data-testid={`config-${config.id}`} key={config.id}>
        <div className="config-item">
          <div className="config-item__content">
            <div className="config-item__preview">
              {config.preview ? (
                <a
                  href={getFencequotingURL({
                    schemaCode: config.code,
                    zipCode: zipcode,
                    fenceSideLength: config.units,
                    fenceSideSlopePercent: config.grade,
                  })}
                >
                  <img src={config.preview} />
                </a>
              ) : (
                <Spinner active={true} borderWidth={0.2} color="blue" size={48} />
              )}
            </div>
            <div className="config-item__info">
              <div className="config-item__title">
                <span data-testid={`config-title-${config.id}`}>{getConfigName(config.catalog_type)}</span>
                <span className="config-item__length">
                  {config.price && (
                    <div className="config-item__price" data-testid={`config-price-${config.id}`}>
                      {priceText}
                    </div>
                  )}
                </span>
              </div>
              <div className="config-item__internal-wrapper">
                <div className="config-item__description" data-testid={`config-description-${config.id}`}>
                  {this.renderDescription(config)}
                </div>
                <div className="config-item__preview__in-description">
                  {config.preview ? (
                    <img src={config.preview} />
                  ) : (
                    <Spinner active={true} borderWidth={0.2} color="blue" size={36} />
                  )}
                </div>
              </div>
              <div className="config-item__actions">
                <div className="config-item__buttons">
                  <Button
                    data-testid={`config-edit-${config.id}`}
                    flavor="regular"
                    onClick={() => this.editConfig(index)}
                    size="small"
                    taste="line"
                  >
                    Edit
                  </Button>
                  <Button
                    className="delete-config-button"
                    data-testid={`config-delete-${config.id}`}
                    flavor="attention"
                    onClick={() => this.removeConfig(index)}
                    size="small"
                    taste="boundless"
                  >
                    Delete
                  </Button>
                </div>
                {!isGateConfig && (
                  <div className="config-item__length-field">
                    <span className="config-item__length-label">Length:</span>
                    <Input
                      max={100}
                      min={1}
                      onChange={(_event: React.FormEvent<HTMLInputElement>, _name: string, value: string) =>
                        this.onUnitsChange(value, index)
                      }
                      size="small"
                      step="1"
                      type="number"
                      value={length}
                    />
                    <span className="config-item__length-field-unit">ft</span>
                  </div>
                )}
                {isGateConfig && (
                  <div className="config-item__length-field">
                    <span className="config-item__length-label">Count:</span>
                    <Input
                      className="unit-input"
                      max={100}
                      min={1}
                      onChange={(_event: React.FormEvent<HTMLInputElement>, _name: string, value: string) =>
                        this.onUnitsChange(value, index)
                      }
                      size="small"
                      step="1"
                      type="number"
                      value={length}
                    />
                  </div>
                )}
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
    const schemaCode = config?.code ? `?${config?.code}` : undefined;
    const doneButtonText = styleBrowserIndex === -1 ? 'Add to order' : 'Save changes';
    return (
      <StyleBrowserWrapper
        doneButtonText={doneButtonText}
        initialSchemaCode={schemaCode}
        onClose={() => this.onCloseEditorClick()}
        onDone={(editorModel) => this.onDoneEditorClick(editorModel, styleBrowserIndex)}
        onLoaded={() => this.onStyleBrowserLoaded()}
        showLoadingError={this.showLoadingError}
        zipcode={this.props.zipcode}
      />
    );
  }

  render() {
    const {configs} = this.props;
    const {showStyleBrowser, styleBrowserIndex, styleBrowserLoaded, isLoadingModalErrored} = this.state;
    const styleBrowserContainerClasses = classNames({
      'style-browser-loader': true,
      loaded: styleBrowserLoaded,
    });
    const styleBrowserPreloaderClasses = classNames({
      'style-browser-preloader': true,
      loaded: styleBrowserLoaded,
      show: showStyleBrowser,
    });

    return (
      <React.Fragment>
        <div data-testid="config-cart">
          <div className={styleBrowserPreloaderClasses}>
            {isLoadingModalErrored ? (
              <LoadingErrorModal onClose={this.closeLoadingError} />
            ) : (
              <Spinner active={!styleBrowserLoaded} borderWidth={0.16} color="white" size={64} />
            )}
          </div>
          {showStyleBrowser ? <div className={styleBrowserContainerClasses}>{this.renderStyleBrowser()}</div> : null}
        </div>
        <div className="config-cart__wrapper">
          <div className="config-cart" ref={(node) => (this.configCardRef = node)}>
            <div className="config-cart__title">
              <h4 data-testid="configs-header">Selected configurations</h4>
            </div>
            <div className="config-cart__list">
              {configs.map((config, index) => this.renderConfig(config, index))}
              {!configs.length && (
                <div>
                  <div className="config-cart__no-config-title">
                    You didn&apos;t add any fence or gate configuration
                  </div>
                  <div className="config-cart__no-config-description">Add a config to send with quote request</div>
                  <hr />
                </div>
              )}
            </div>
            <div className="config-cart__resume">
              <Button
                asAnchor={!(showStyleBrowser && styleBrowserIndex === -1)}
                className="add-config-button"
                disabled={showStyleBrowser && styleBrowserIndex === -1}
                flavor="regular"
                onClick={this.onAddConfigClick.bind(this)}
                size="large"
                taste="line"
              >
                <ReactSVG className="spacing right__is-5" src={iconPlus} />
                Add a config
              </Button>
              <div className="config-cart__total">
                {this.getTotal() ? `Total estimate: ~$${Math.round(this.getTotal())}` : null}
              </div>
            </div>
            <div className="config-cart__disclaimer">
              The price shown are for informational purposes only. Actual prices may vary with project complexity,
              material price fluctuations and additional options. Contact us to speak to an expert and get a
              personalized full quote.
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ConfigCart;
