import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import Carousel, {Modal, ModalGateway} from 'react-images';
import Masonry from 'react-masonry-component';
import {NavLink} from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';

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
    url: '/gallery/gate/single',
  },
  DRIVEWAY_BANNER: {
    imageSrc: 'https://ergeon-photo-gallery.s3-us-west-1.amazonaws.com/previews/banner_driveway.jpg',
    header: 'Driveway Photos',
    description: 'Stamped & Stained Concrete, Brushed Concrete, Pavers',
    url: '/gallery/driveway/stamped',
  },
};

import './index.scss';

class PhotoGallery extends React.Component {
    static propTypes = {
      children: PropTypes.node,
      history: PropTypes.object,
      location: PropTypes.object,
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
      const {history, location: {pathname, search}} = this.props;
      history.push(`${pathname}${search}#${slug}`);
    }

    handlePhotoClick(photoProps, index) {
      this.updateLocationHash(photoProps.slug);
      this.setState({modalOpened: true, imageIndex: index});
    }

    clearLocationHash() {
      const {history, location: {pathname, search}} = this.props;
      history.push(`${pathname}${search}`);
    }

    handleModalClose() {
      this.clearLocationHash();
      this.setState({modalOpened: false});
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

      if (groupSlug && group) return group.groupPhotos.map((elem) => {
        // there's some groupPhotos that doesn't contain caption, so lets map title to them
        if (!elem.caption && elem.title) return {caption: elem.title, ...elem};
        return elem;
      }) || [];
      return category.categoryPhotos || [];
    }

    layoutImages() {
      if (this.masonry) {
        setTimeout(() => {
          this.masonry.layout();
        });
      }
    }

    renderPhotos() {
      const photos = this.getPhotos();

      return (
        <Masonry
          className="photo-gallery__masonry"
          ref={ref => this.masonry = this.masonry || ref?.masonry}>
          {!isEmpty(photos) && photos.map((photoProps, index) => (
            <div
              className="photo-gallery__masonry-card"
              gallery-link-id={photoProps.slug}
              key={photoProps.slug}
              onClick={this.handlePhotoClick.bind(this, photoProps, index)}>
              <ImageCard onImageLoaded={this.layoutImages.bind(this)} {...photoProps} />
            </div>
          ))}
        </Masonry>
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
      if (isNil(partners)) return;
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
      if (!productSlug) {
        return (
          <div className="photo-gallery">
            <div className="wrapper-1180">
              <span className="breadcrumbs">
                <NavLink to="/"><span className="icon home"/></NavLink>
                <ul>
                  <li><NavLink to="/gallery/">Photo gallery</NavLink></li>
                </ul>
              </span>
              <h1 className="h2">Photo gallery</h1>
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
      }

      const {modalOpened, imageIndex} = this.state;
      const category = this.getCategoryData();
      const breadcrumbGroups = this.getBreadcrumbGroups();
      const activeGroup = find(breadcrumbGroups, {highlighted: true});

      const banners = {
        [PRODUCTS.FENCE]: [BANNERS.GATE_BANNER, BANNERS.DRIVEWAY_BANNER],
        [PRODUCTS.GATE]: [BANNERS.FENCE_BANNER, BANNERS.DRIVEWAY_BANNER],
        [PRODUCTS.DRIVEWAY]: [BANNERS.FENCE_BANNER, BANNERS.GATE_BANNER],
      }[productSlug];

      const photos = this.getPhotos();

      return (
        <div className="photo-gallery">
          <div className="wrapper-1180">
            <span className="breadcrumbs">
              <NavLink to="/"><span className="icon home"/></NavLink>
              <ul>
                <li><NavLink to="/gallery/">Photo gallery</NavLink></li>
              </ul>
            </span>
            <h1 className="h2">{category?.categoryName} {activeGroup?.name} {this.getProductGalleryName()}</h1>
          </div>
          <div className="header-border">
            <div className="photo-gallery__categories wrapper-1180">
              <Tabs items={this.getCategoryTabs()} useNavLinks />
            </div>
          </div>
          <div className="wrapper-1180">
            {breadcrumbGroups.length > 1 && <div className="photo-gallery__groups spacing after__is-24">
              <Breadcrumb
                items={[breadcrumbGroups]} secondary/>
            </div>}
            {this.renderPhotos()}
            <div className="cards two-columns spacing before__is-64">
              {banners.map((banner, index) => this.renderBanner(banner, index))}
            </div>
            {category.partners && this.renderPartners(null)}
            <ModalGateway>
              {!isEmpty(photos) && modalOpened ? (
                <Modal onClose={() => this.handleModalClose()}>
                  <Carousel
                    currentIndex={imageIndex}
                    trackProps={{
                      onViewChange: index => this.updateLocationHash(photos[index].slug),
                    }}
                    views={photos.map(({caption, url}) => ({caption, src: url}))}/>
                </Modal>
              ) : null}
            </ModalGateway>
          </div>
        </div>
      );
    }
}

export default PhotoGallery;
