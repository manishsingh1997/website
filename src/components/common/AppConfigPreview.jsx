import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Spinner} from '@ergeon/core-components';
import previewPlaceholderIcon from '@ergeon/core-components/src/assets/icon-photo-placeholder.svg';
import noPreviewIcon from '@ergeon/core-components/src/assets/no-preview.svg';
import {calcUtils} from '@ergeon/3d-lib';
import {constants as constants3dLib} from '@ergeon/3d-lib';

import config from 'website/config';

import './AppConfigPreview.scss';

const USE_CACHE = true;
const DEFAULT_PREVIEW_WIDTH = 150;
const DEFAULT_PREVIEW_HEIGTH = 150;

export default class AppConfigPreview extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    noPreview: PropTypes.bool,
    schemaCodeUrl: PropTypes.string,
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
    const {schemaCodeUrl, noPreview} = this.props;
    if (noPreview) {
      this.setState({previewImage: noPreviewIcon});
      return;
    }
    if (!schemaCodeUrl) {
      this.setState({previewImage: previewPlaceholderIcon});
      return;
    }
    const data = calcUtils.getValueFromUrl(`/?${schemaCodeUrl}`);
    this.setState({isLoading: true});
    try {
      const preview = await calcUtils.getPreviewImage(
        data,
        DEFAULT_PREVIEW_WIDTH,
        DEFAULT_PREVIEW_HEIGTH,
        USE_CACHE,
      );
      this.setState({previewImage: preview});
    } catch (error) {
      this.setState({previewImage: previewPlaceholderIcon});
      if (error !== constants3dLib.UNKNOWN_SCHEMA_CODE_ERROR) {
        console.error(error, schemaCodeUrl);
      }
    }
  }

  renderPreviewWithLink() {
    const {schemaCodeUrl, zipCode} = this.props;
    return (
      <a
        href={`${config.fencequotingHost}/fence3d?${schemaCodeUrl}&mode=3d&options=true&zipcode=${zipCode}`}
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
    const {withLink, className} = this.props;
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
        {withLink ? this.renderPreviewWithLink() : this.renderPreview()}
      </div>
    );
  }
}
