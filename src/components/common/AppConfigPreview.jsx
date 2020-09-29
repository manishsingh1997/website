import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Sentry from '@sentry/browser';

import {Spinner} from '@ergeon/core-components';
import previewPlaceholderIcon from '@ergeon/core-components/src/assets/icon-photo-placeholder.svg';
import noPreviewIcon from '@ergeon/core-components/src/assets/no-preview.svg';
import {calcUtils} from '@ergeon/3d-lib';
import {constants as constants3dLib} from '@ergeon/3d-lib';
import {CALC_GATE_TYPE} from 'website/constants';

import config from 'website/config';

import './AppConfigPreview.scss';

const USE_CACHE = true;
const DEFAULT_PREVIEW_WIDTH = 150;
const DEFAULT_PREVIEW_HEIGTH = 150;

export default class AppConfigPreview extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    configType: PropTypes.string,
    propertySchemaCodeUrl: PropTypes.string,
    schemaCodeUrl: PropTypes.string,
    useNoPreviewIcon: PropTypes.bool,
    withLink: PropTypes.bool,
    zipCode: PropTypes.string,
  };

  state = {
    previewImage: undefined,
    isLoading: false,
  };

  async componentDidMount() {
    await this.fetchQuotePreview();
  }

  async fetchQuotePreview() {
    const {schemaCodeUrl, useNoPreviewIcon} = this.props;
    if (useNoPreviewIcon) {
      this.setState({previewImage: noPreviewIcon});
      return;
    }
    if (!schemaCodeUrl) {
      this.setState({previewImage: previewPlaceholderIcon});
      return;
    }
    this.setState({isLoading: true});
    try {
      const preview = await calcUtils.getPreviewImage(
        schemaCodeUrl,
        DEFAULT_PREVIEW_WIDTH,
        DEFAULT_PREVIEW_HEIGTH,
        USE_CACHE,
      );
      this.setState({previewImage: preview});
    } catch (error) {
      this.setState({previewImage: previewPlaceholderIcon, isLoading: false});
      if (error !== constants3dLib.UNKNOWN_PRODUCT_ERROR) {
        Sentry.withScope(scope => {
          scope.setExtra('schemaCode', schemaCodeUrl);
          console.error(error);
        });
      }
    }
  }

  renderPreviewWithLink() {
    const {configType, propertySchemaCodeUrl, schemaCodeUrl, zipCode} = this.props;
    const baseUrlPath = configType === CALC_GATE_TYPE ? 'gate3d' : 'fence3d';  // fallback to fence
    let finalSchemaCodeUrl = `${schemaCodeUrl}`;
    if (propertySchemaCodeUrl)
      finalSchemaCodeUrl = `${schemaCodeUrl}&${propertySchemaCodeUrl}`;

    return (
      <a
        href={`${config.fencequotingHost}/${baseUrlPath}?${finalSchemaCodeUrl}&mode=3d&options=true&zipcode=${zipCode}`}
        rel="noopener noreferrer"
        target="_blank">
        {this.renderPreview()}
      </a>
    );
  }

  renderPreview() {
    const {isLoading, previewImage} = this.state;
    const isPlaceholder = previewImage === previewPlaceholderIcon || previewImage === noPreviewIcon;
    return (
      <img
        className={classNames({'preview-placeholder': isPlaceholder, 'hidden-img': isLoading})}
        onLoad={() => this.setState({'isLoading': false})}
        src={previewImage} />
    );
  }

  render() {
    const {withLink, schemaCodeUrl, className} = this.props;
    const {isLoading, previewImage} = this.state;
    const isPlaceholder = previewImage === previewPlaceholderIcon || previewImage === noPreviewIcon;

    return (
      <div
        className={classNames(
          {'config-preview': true,
            'border': true,
            'config-preview__no-preview': isPlaceholder,
            [className]: !!className}
        )}>
        {isLoading && <Spinner active={true} borderWidth={.15} color="green" size={64} />}
        {withLink && schemaCodeUrl ? this.renderPreviewWithLink() : this.renderPreview()}
      </div>
    );
  }
}
