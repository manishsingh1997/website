import React from 'react';
import MetaTags from 'react-meta-tags';
import PropTypes from 'prop-types';
import {find} from 'lodash';
import Carousel, {Modal, ModalGateway} from 'react-images';
import {NavLink} from 'react-router-dom';

import {Tabs, Breadcrumb, ImageCard} from '@ergeon/core-components';

import {
  FencePhotoData,
  GatePhotoData,
  DrivewayPhotoData,
} from 'data/photo-gallery';

const PRODUCTS = {
  FENCE: 'fence',
  GATE: 'gate',
  DRIVEWAY: 'driveway',
};

const BANNERS = {
  FENCE_BANNER: {
    imageSrc: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/previews/banner_fence.jpg',
    header: 'Fence Photos',
    description: 'Picture Frame, Nail Up, Horizontal, Gates, Before & After',
    url: '/gallery/fence/picture-frame',
  },
  GATE_BANNER: {
    imageSrc: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/previews/banner_gate.jpg',
    header: 'Gate Photos',
    description: 'Picture Frame, Nail Up, Horizontal, Gates, Before & After',
    url: '/gallery/gate/nail-up',
  },
  DRIVEWAY_BANNER: {
    imageSrc: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/previews/banner_driveway.jpg',
    header: 'Driveway Photos',
    description: 'Stamped & Stained Concrete, Brushed Concrete, Pavers',
    url: '/gallery/driveway/stamped',
  },
};

import './photo-gallery.scss';
class PhotoGallery extends React.Component {
    static propTypes = {
      children: PropTypes.node,
      match: PropTypes.shape({
        params: PropTypes.shape({
          categorySlug: PropTypes.string,
          groupSlug: PropTypes.string,
          productSlug: PropTypes.oneOf(Object.values(PRODUCTS)),
        }),
      }),
    };

    state = {
      modalOpened: false,
      imageIndex: 0,
    };

    updateLocationHash(slug) {
      const pathname = document.location.hash;
      const hashes = pathname.split('#');
      hashes[2] = slug;
      document.location.hash = hashes.join('#');
    }

    handlePhotoClick(photoProps, index) {
      this.updateLocationHash(photoProps.slug);
      this.setState({modalOpened: true, imageIndex: index});
    }

    getProductData() {
      const {productSlug} = this.props.match.params;
      const dataByProduct = {
        [PRODUCTS.FENCE]: FencePhotoData,
        [PRODUCTS.GATE]: GatePhotoData,
        [PRODUCTS.DRIVEWAY]: DrivewayPhotoData,
      };

      return dataByProduct[productSlug] || dataByProduct[PRODUCTS.FENCE];
    }

    getCategoryData() {
      const {categorySlug} = this.props.match.params;
      const product = this.getProductData();
      return find(product, {categorySlug}) || {};
    }

    getBreadcrumbGroups() {
      const {productSlug, categorySlug, groupSlug} = this.props.match.params;
      const category = this.getCategoryData();
      const categoryGroups = category.categoryGroups || [];

      return categoryGroups.map(group => ({
        name: group.groupName,
        to: `/gallery/${productSlug}/${categorySlug}/${group.groupSlug}`,
        highlighted: groupSlug === group.groupSlug,
      }));
    }

    getCategoryTabs() {
      const {productSlug, categorySlug} = this.props.match.params;

      return this.getProductData().map(category => ({
        content: category.categoryName,
        id: `tab-${category.categorySlug}`,
        to: `/gallery/${productSlug}/${category.categorySlug}`,
        active: categorySlug === category.categorySlug,
        exact: false,
      }));
    }

    getProductGalleryName() {
      const {productSlug} = this.props.match.params;
      const productGalleryNames = {
        [PRODUCTS.FENCE]: 'Fence Photos',
        [PRODUCTS.GATE]: 'Gate Photos',
        [PRODUCTS.DRIVEWAY]: 'Driveway Photos',
      };

      return productGalleryNames[productSlug || 'fence'] || productGalleryNames['fence'];
    }

    getPhotos() {
      const {groupSlug} = this.props.match.params;
      const category = this.getCategoryData();
      const group = find(category.categoryGroups, {groupSlug});

      if (groupSlug && group) return group.groupPhotos || [];
      return category.categoryPhotos || [];
    }

    renderPhotos() {
      let photos = this.getPhotos();

      return (
        <div className="cards three-columns">
          {photos.map((photoProps, index) => (
            <div
              className="card"
              gallery-link-id={photoProps.slug}
              key={photoProps.slug}
              onClick={this.handlePhotoClick.bind(this, photoProps, index)}>
              <ImageCard {...photoProps} />
            </div>
          ))}
        </div>
      );
    }

    renderBanner({imageSrc, header, description, url}, key) {
      return (
        <div className="card soft-border photo-gallery__banner" key={key}>
          <img className="photo-gallery__banner-photo" src={imageSrc} />
          <div className="photo-gallery__banner-data">
            <h4 className="additional-header h2 spacing after__is-6">{header}</h4>
            <p className="spacing after__is-12">
              {description}
            </p>
            <NavLink
              className="button button--regular taste__line button--size__medium"
              to={url}>
              Open Gallery
            </NavLink>
          </div>
        </div>
      );
    }

    renderPartners(partners = []) {
      return (
        <div className="photo-gallery__partners-area">
          <label className="label uppercase spacing after__is-12">
            FOR ADDITIONAL CUSTOMIZED OPTIONS VISIT OUR PARTNER LINKS
          </label>
          <div className="photo-gallery__partners">
            {partners.map(({name, slug, url, imageSrc}) => (
              <a
                className="photo-gallery__partner card soft-border shadow__z1"
                href={url}
                key={`partner-${slug}`}
                rel="noopener noreferrer"
                target="_blank">
                <div className="photo-gallery__partner-image" style={{backgroundImage: `url(${imageSrc})`}} />
                <div className="photo-gallery__partner-description">
                  <div>
                    <h4 className="additional-header h4">
                      {name}
                    </h4>
                    <div className="photo-gallery__partner-site">
                      {url}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      );
    }

    render() {
      const {productSlug} = this.props.match.params;
      if (!productSlug) return (
        <div className="photo-gallery">
          <MetaTags>
            <title>Photo Gallery</title>
          </MetaTags>
          <div className="wrapper-1180">
            <span className="breadcrumbs">
              <NavLink to="/"><span className="icon home"/></NavLink>
              <ul>
                <li><NavLink to="/gallery/">Photo gallery</NavLink></li>
              </ul>
            </span>
            <h2>Photo gallery</h2>
          </div>
          <div className="header-border spacing after__is-24">
          </div>
          <div className="wrapper-1180">
            <div className="cards two-columns">
              {[BANNERS.GATE_BANNER, BANNERS.DRIVEWAY_BANNER, BANNERS.FENCE_BANNER].map(
                (banner, index) => this.renderBanner(banner, index)
              )}
            </div>

          </div>

        </div>
      );
      const {modalOpened, imageIndex} = this.state;
      const category = this.getCategoryData();

      const banners = {
        [PRODUCTS.FENCE]: [BANNERS.GATE_BANNER, BANNERS.DRIVEWAY_BANNER],
        [PRODUCTS.GATE]: [BANNERS.FENCE_BANNER, BANNERS.DRIVEWAY_BANNER],
        [PRODUCTS.DRIVEWAY]: [BANNERS.FENCE_BANNER, BANNERS.GATE_BANNER],
      }[productSlug];

      const metadata = {
        title: {
          [PRODUCTS.FENCE]: 'Fence Photo Gallery',
          [PRODUCTS.GATE]: 'Gate Photo Gallery',
          [PRODUCTS.DRIVEWAY]: 'Drive Photo Gallery',
        }[productSlug],
        description: {
          [PRODUCTS.FENCE]: 'Picture Frame, Nail Up, Horizontal, Gates, Before & After',
          [PRODUCTS.GATE]: 'Gates, Nail Up, Picture Frame single, Picture Frame Double',
          [PRODUCTS.DRIVEWAY]: 'Stamped & Stained Concrete, Brushed Concrete, Pavers',
        }[productSlug],
      };

      return (
        <div className="photo-gallery">
          <MetaTags>
            <title>{metadata.title}</title>
            <meta content={metadata.description} name="description"/>
            <meta content={metadata.description} property="og:description"/>
          </MetaTags>
          <div className="wrapper-1180">
            <span className="breadcrumbs">
              <NavLink to="/"><span className="icon home"/></NavLink>
              <ul>
                <li><NavLink to="/gallery/">Photo gallery</NavLink></li>
              </ul>
            </span>
            <h2>{this.getProductGalleryName()}</h2>
          </div>
          <div className="header-border spacing after__is-24">
            <div className="photo-gallery__categories wrapper-1180">
              <Tabs items={this.getCategoryTabs()} useNavLinks />
            </div>
          </div>
          <div className="wrapper-1180">
            <div className="photo-gallery__groups spacing after__is-24">
              <Breadcrumb
                items={[this.getBreadcrumbGroups()]} secondary/>
            </div>
            {this.renderPhotos()}
            <div className="cards two-columns spacing before__is-64">
              {banners.map((banner, index) => this.renderBanner(banner, index))}
            </div>
            {category.partners && this.renderPartners(category.partners)}
            <ModalGateway>
              {modalOpened ? (
                <Modal onClose={() => this.setState({modalOpened: false})}>
                  <Carousel
                    currentIndex={imageIndex}
                    trackProps={{
                      onViewChange: index => this.updateLocationHash(this.getPhotos()[index].slug),
                    }}
                    views={this.getPhotos().map(({caption, url}) => ({caption, src: url}))}/>
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
        </div>
      );
    }
}

export default PhotoGallery;