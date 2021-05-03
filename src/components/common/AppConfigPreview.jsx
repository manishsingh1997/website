import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Sentry from '@sentry/browser';

import {Spinner, ImageGallery, SwipeGallery, ImageCard} from '@ergeon/core-components';
import previewPlaceholderIcon from '@ergeon/core-components/src/assets/icon-photo-placeholder.svg';
import noPreviewIcon from '@ergeon/core-components/src/assets/no-preview.svg';
import {calcUtils} from '@ergeon/3d-lib';
import {constants as constants3dLib} from '@ergeon/3d-lib';
import {isPDFMode} from 'utils/utils';
import {isUpcomingFeaturesEnabled} from '@ergeon/erg-utils-js';
import {getFencequotingURL} from '../../utils/urls';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

import './AppConfigPreview.scss';

const USE_CACHE = true;
const DEFAULT_PREVIEW_WIDTH = 150;
const DEFAULT_PREVIEW_HEIGTH = 150;

export default class AppConfigPreview extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    configType: PropTypes.string,
    fenceSideLength: PropTypes.number,
    images: PropTypes.array,
    propertySchemaCodeUrl: PropTypes.string,
    schemaCodeUrl: PropTypes.string,
    useNoPreviewIcon: PropTypes.bool,
    withLink: PropTypes.bool,
    zipCode: PropTypes.string,
  };

  static defaultProps = {
    withLink: false,
    fenceSideLength: 6,
  }

  state = {
    previewImage: undefined,
    isLoading: false,
  };

  async componentDidMount() {
    await this.fetchQuotePreview();
  }

  async fetchQuotePreview() {
    const {schemaCodeUrl, useNoPreviewIcon, images} = this.props;
    if (useNoPreviewIcon) {
      this.setState({previewImage: noPreviewIcon});
      return;
    }
    if (!schemaCodeUrl) {
      this.setState({previewImage: previewPlaceholderIcon});
      return;
    }
    // check if images is empty, if thats the case isLoading will be set on the image onLoad callback
    this.setState({isLoading: isEmpty(images)});
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
      if ((error?.msg || error) !== constants3dLib.UNKNOWN_PRODUCT_ERROR) {
        Sentry.withScope(scope => {
          scope.setExtra('schemaCode', schemaCodeUrl);
          if (error.msg && error.type && error.mode) {
            scope.setExtra('msg', error.msg);
            scope.setExtra('type', error.type);
            scope.setExtra('mode', error.mode);
            console.error(error.msg);
          } else {
            console.error(error);
          }

        });
      }
    }
  }

  conditionalConfigPreview() {
    const {withLink, schemaCodeUrl, images} = this.props;
    const withLinkAndSchemaUrl = Boolean(withLink && schemaCodeUrl);
    // Note: as images are now part of props enable galleries only if images isn't empty
    // if they are then we should fallback to renderPreviewWithLink/renderPreview
    if (isUpcomingFeaturesEnabled() && !isEmpty(images)) {
      return this.renderGalleries();
    }
    if (!isUpcomingFeaturesEnabled() && withLinkAndSchemaUrl) {
      return this.renderPreviewWithLink();
    }
    // !withLinkAndSchemaUrl should land here
    return this.renderPreview();
  }

  configPreview() {
    const {className, images} = this.props;
    const {isLoading, previewImage} = this.state;
    const isPlaceholder = isEqual(previewImage, previewPlaceholderIcon) || isEqual(previewImage, noPreviewIcon);
    return (
      <div
        className={classNames('config-preview', 'border',
          {
            'gallery-preview': !isEmpty(images),
            'config-preview__no-preview': isPlaceholder,
            [className]: Boolean(className),
          }
        )}>
        {isLoading && <Spinner active borderWidth={.15} color="green" size={64} />}
        {this.conditionalConfigPreview()}
      </div>
    );
  }

  renderPreviewWithLink() {
    const {propertySchemaCodeUrl, schemaCodeUrl, zipCode, fenceSideLength} = this.props;
    let finalSchemaCodeUrl = `${schemaCodeUrl}`;
    if (propertySchemaCodeUrl) {
      finalSchemaCodeUrl = `${schemaCodeUrl}&${propertySchemaCodeUrl}`;
    }

    return (
      <a
        href={getFencequotingURL(finalSchemaCodeUrl, zipCode, fenceSideLength)}
        rel="noopener noreferrer"
        target="_blank">
        {this.renderPreview()}
      </a>
    );
  }

  renderPreview() {
    const {isLoading, previewImage} = this.state;
    const isPlaceholder = isEqual(previewImage, previewPlaceholderIcon) || isEqual(previewImage, noPreviewIcon);
    return (
      <img
        className={classNames('preview-image', {'preview-placeholder': isPlaceholder, 'hidden-img': isLoading})}
        onLoad={() => this.setState({isLoading: false})}
        src={previewImage} />
    );
  }

  renderGalleries() {
    const {images} = this.props;
    let imagesObj;
    if (!isEmpty(images)) {
      // galleries need url key, map images.file to it
      imagesObj = images.map((elem) => ({url: elem.file, ...elem}));
    }
    return (
      <>
        {imagesObj &&
          <>
            <div className="desktop-length">
              <ImageGallery height={150} images={imagesObj} width={150} />
            </div>
            <div className="mobile-length">
              <SwipeGallery images={imagesObj} />
            </div>
          </>
        }
      </>
    );
  }

  render() {
    const {images} = this.props;
    // only for pdf mode so we can show all imageslist
    if (isUpcomingFeaturesEnabled() && isPDFMode() && !isEmpty(images)) {
      return (
        <div className="cards two-columns">
          {images.map((elem) => <ImageCard key={elem.id} title={elem.title} url={elem.file} />)}
        </div>
      );
    }
    return this.configPreview();
  }
}
