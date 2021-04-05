import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as Sentry from '@sentry/browser';

import {Spinner, ImageGallery, SwipeGallery, ImageCard} from '@ergeon/core-components';
import previewPlaceholderIcon from '@ergeon/core-components/src/assets/icon-photo-placeholder.svg';
import noPreviewIcon from '@ergeon/core-components/src/assets/no-preview.svg';
import {calcUtils} from '@ergeon/3d-lib';
import {constants as constants3dLib} from '@ergeon/3d-lib';
import {CALC_GATE_TYPE} from 'website/constants';
import {isPDFMode} from 'utils/utils';
import {isUpcomingFeaturesEnabled} from '@ergeon/erg-utils-js';
import isEqual from 'lodash/isEqual';

import config from 'website/config';

import './AppConfigPreview.scss';

const USE_CACHE = true;
const DEFAULT_PREVIEW_WIDTH = 150;
const DEFAULT_PREVIEW_HEIGTH = 150;

export default class AppConfigPreview extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    configType: PropTypes.string,
    fenceSideLength: PropTypes.number,
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
    images: undefined,
  };

  async componentDidMount() {
    if (isUpcomingFeaturesEnabled()) {
      this.fetchImageList();
    }
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

  fetchImageList() {
    // mock api to retrieve images for ImageGallery and SwipeGallery
    this.setState({isLoading: true});
    // simulate api call delay
    setTimeout(() => {
      this.setState({
        images: [
          {
            id: 1,
            title: 'Test 1',
            url:
              'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Roseville+California+-+Single+Gate+1.jpg',
          },
          {
            id: 2,
            title: 'Test 2',
            url: 'https://assets.website-files.com/5ad551c41ca0c52724be6c55/5bef42fe6add22891a0cf62c_stampstained9.jpg',
          },
          {
            id: 3,
            title: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut pretium diam. Nam eget nisl 
          pretium,ultricies dolor eget, vestibulum nisl. Praesent quis neque fermentum, pharetra nisl vitae,
          facilisis magna.
          Proin vitae rhoncus turpis. Curabitur tristique tortor quis tortor mollis, in faucibus augue porttitor.
          Vivamus at risus est. Praesent velit est, bibendum id leo a, sagittis dapibus ante. Morbi eros tortor,
          ornare sed porttitor accumsan, euismod eu massa.`,
            url:
              'https://assets.website-files.com/5ad551c41ca0c52724be6c55/5cc086dd9e1f671c728112fe_vallejo%20picture%20frame.jpg',
          },
          {
            id: 4,
            title: 'Test 4',
            url: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+San+Rafael+California+-+Single+Gate+2.jpg',
          },
          {
            id: 5,
            title: 'Test 5',
            url:
              'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/gate/Gate+Installation+-+Ergeon+-+Granite+Bay%2C+California+-+Single+Gate+2.jpg',
          },
        ],
        isLoading: false,
      });
    }, 2000);
  }

  conditionalConfigPreview() {
    const {withLink, schemaCodeUrl} = this.props;
    const withLinkAndSchemaUrl = Boolean(withLink && schemaCodeUrl);
    // Note: when removing upcoming flag we can simplify refactoring directly on configPreview()
    if (isUpcomingFeaturesEnabled() && withLinkAndSchemaUrl) {
      return this.renderGalleries();
    }
    if (!isUpcomingFeaturesEnabled() && withLinkAndSchemaUrl) {
      return this.renderPreviewWithLink();
    }
    // !withLinkAndSchemaUrl should land here
    return this.renderPreview();
  }

  configPreview() {
    const {className} = this.props;
    const {isLoading, previewImage, images} = this.state;
    const isPlaceholder = isEqual(previewImage, previewPlaceholderIcon) || isEqual(previewImage, noPreviewIcon);
    return (
      <div
        className={classNames('config-preview', 'border',
          {
            'gallery-preview': images && !isPlaceholder,
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
    const {configType, propertySchemaCodeUrl, schemaCodeUrl, zipCode, fenceSideLength} = this.props;
    const baseUrlPath = configType === CALC_GATE_TYPE ? 'gate3d' : 'fence3d';  // fallback to fence
    let finalSchemaCodeUrl = `${schemaCodeUrl}`;
    if (propertySchemaCodeUrl) {
      finalSchemaCodeUrl = `${schemaCodeUrl}&${propertySchemaCodeUrl}`;
    }

    return (
      <a
        href={`${config.fencequotingHost}/${baseUrlPath}?${finalSchemaCodeUrl}&mode=3d&options=true&zipcode=${zipCode}\
               &length=${fenceSideLength}`}
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
        className={classNames({'preview-placeholder': isPlaceholder, 'hidden-img': isLoading})}
        onLoad={() => this.setState({'isLoading': false})}
        src={previewImage} />
    );
  }

  renderGalleries() {
    const {images} = this.state;
    return (
      <>
        {images &&
        <>
          <div className="desktop-length">
            <ImageGallery images={images}/>
          </div>
          <div className="mobile-length">
            <SwipeGallery images={images}/>
          </div>
        </>
        }
      </>
    );
  }

  render() {
    const {previewImage, images} = this.state;
    const isPlaceholder = isEqual(previewImage, previewPlaceholderIcon) || isEqual(previewImage, noPreviewIcon);

    return (
      <>
        {/* Note: when removing upcoming flag, we should always check for pdfMode, line below should be taken out */}
        {!isUpcomingFeaturesEnabled() && this.configPreview()}
        {/* Hide configPreview if we are in pdf mode, we will render all images in that case*/}
        {isUpcomingFeaturesEnabled() && !isPDFMode() && this.configPreview()}
        {isUpcomingFeaturesEnabled() && isPDFMode() && images && !isPlaceholder &&
        <div className="cards two-columns">
          {images.map((elem) => <ImageCard key={elem.id} title={elem.title} url={elem.url} />)}
        </div>
        }
      </>
    );
  }
}
