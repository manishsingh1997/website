import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {Spinner, ImageGallery, SwipeGallery, ImageCard} from '@ergeon/core-components';
import preview3DIcon from '@ergeon/core-components/src/assets/icon-3d.svg';
import previewPlaceholderIcon from '@ergeon/core-components/src/assets/icon-photo-placeholder.svg';
import noPreviewIcon from '@ergeon/core-components/src/assets/no-preview.svg';
import {calcUtils} from '@ergeon/3d-lib';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import {isPDFMode} from '../../utils/utils';
import {getFencequotingURL} from '../../utils/urls.ts';

import './AppConfigPreview.scss';

const USE_CACHE = true;
const DEFAULT_PREVIEW_WIDTH = 300;
const DEFAULT_PREVIEW_HEIGHT = 300;

export default class AppConfigPreview extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    configType: PropTypes.string,
    fenceSideLength: PropTypes.number,
    images: PropTypes.array,
    isMobileWidth: PropTypes.bool,
    propertySchemaCodeUrl: PropTypes.string,
    schemaCodeUrl: PropTypes.string,
    useNoPreviewIcon: PropTypes.bool,
    withLink: PropTypes.bool,
    zipCode: PropTypes.string,
  };

  static defaultProps = {
    withLink: false,
    fenceSideLength: 6,
    isMobileWidth: false,
  };

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
      const preview = await calcUtils.getPreviewImage({
        height: DEFAULT_PREVIEW_HEIGHT,
        schemaCodeUrl,
        useCache: USE_CACHE,
        width: DEFAULT_PREVIEW_WIDTH,
      });
      this.setState({previewImage: preview, isLoading: false});
    } catch (error) {
      this.setState({previewImage: previewPlaceholderIcon, isLoading: false});
    }
  }

  conditionalConfigPreview() {
    const {withLink, schemaCodeUrl, images, isMobileWidth} = this.props;
    const withLinkAndSchemaUrl = Boolean(withLink && schemaCodeUrl);

    if (isMobileWidth && !isEmpty(images) && withLinkAndSchemaUrl) {
      // Render preview together with images swipe-able gallery
      return (
        <div className="quote-line-images-wrapper">
          {this.renderPreviewWithLink()}
          {this.renderGalleries()}
        </div>
      );
    }
    if (isMobileWidth && !isEmpty(images)) {
      // Render swipe-able gallery full width
      return this.renderGalleries();
    }
    if (withLinkAndSchemaUrl) {
      // Only schema, render schema
      return this.renderPreviewWithLink();
    }

    // Otherwise nothing, not even a preview
    return null;
  }

  configPreview() {
    const {className, images, isMobileWidth} = this.props;
    const {isLoading, previewImage} = this.state;
    const isPlaceholder = isEqual(previewImage, previewPlaceholderIcon) || isEqual(previewImage, noPreviewIcon);
    return (
      <div
        className={classNames('config-preview', 'border', {
          'gallery-preview': !isEmpty(images) && isMobileWidth,
          'config-preview__no-preview': isPlaceholder,
          [className]: Boolean(className),
        })}
      >
        {isLoading && <Spinner active borderWidth={0.15} color="blue" size={64} />}
        {this.conditionalConfigPreview()}
      </div>
    );
  }

  isPlaceholder() {
    const {previewImage} = this.state;
    return isEqual(previewImage, previewPlaceholderIcon) || isEqual(previewImage, noPreviewIcon);
  }

  renderPreviewWithLink() {
    const {propertySchemaCodeUrl, schemaCodeUrl, zipCode, fenceSideLength} = this.props;
    let finalSchemaCodeUrl = `${schemaCodeUrl}`;
    if (propertySchemaCodeUrl) {
      finalSchemaCodeUrl = `${schemaCodeUrl}&${propertySchemaCodeUrl}`;
    }

    // Let's not wrap into a link if we render a placeholder
    if (this.isPlaceholder()) {
      return this.renderPreview();
    }

    const linkToFencequoting = getFencequotingURL(
      finalSchemaCodeUrl,
      zipCode,
      fenceSideLength,
      /* show options */ false
    );
    return (
      <a href={linkToFencequoting} rel="noopener noreferrer" target="_blank">
        {this.renderPreview()}
      </a>
    );
  }

  renderPreview() {
    const {isLoading, previewImage} = this.state;
    const previewImageClasses = classNames({
      'preview-image': true,
      'preview-placeholder': this.isPlaceholder(),
      'hidden-img': isLoading,
    });
    return (
      <div className="preview-box">
        <img className={previewImageClasses} onLoad={() => this.setState({isLoading: false})} src={previewImage} />
        <img className="preview-3d" src={preview3DIcon} />
      </div>
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
        {imagesObj && (
          <>
            <div className="desktop-length">
              <ImageGallery height={150} images={imagesObj} width={150} />
            </div>
            <div className="mobile-length">
              <SwipeGallery images={imagesObj} />
            </div>
          </>
        )}
      </>
    );
  }

  render() {
    const {images} = this.props;
    // only for pdf mode so we can show all imageslist
    if (isPDFMode() && !isEmpty(images)) {
      return (
        <div className="cards two-columns">
          {images.map((elem) => (
            <ImageCard key={elem.id} title={elem.title} url={elem.file} />
          ))}
        </div>
      );
    }
    return this.configPreview();
  }
}
