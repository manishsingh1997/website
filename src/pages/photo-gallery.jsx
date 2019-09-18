import React from 'react';
import PropTypes from 'prop-types';
import {find} from 'lodash';
import Carousel, {Modal, ModalGateway} from 'react-images';
import {NavLink} from 'react-router-dom';

import {Tabs, Breadcrumb, Button, ImageCard} from '@ergeon/core-components';

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
    url: '/gallery/gate/picture-frame',
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
          productSlug: PropTypes.oneOf(Object.values(PRODUCTS)).isRequired,
        }),
      }),
    };

    state = {
      modalOpened: false,
      imageIndex: 0,
    };

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
        <div className="photo-gallery__photos">
          {photos.map((photoProps, index) => (
            <div
              className="photo-gallery__photo spacing after__is-24"
              key={photoProps.slug}
              onClick={() => this.setState({modalOpened: true, imageIndex: index})}>
              <ImageCard {...photoProps} />
            </div>
          ))}
        </div>
      );
    }

    renderBanner({imageSrc, header, description, url}, key) {
      return (
        <div className="photo-gallery__banner card soft-border" key={key}>
          <img className="photo-gallery__banner-photo" src={imageSrc} />
          <div className="photo-gallery__banner-data">
            <h4 className="spacing after__is-6">{header}</h4>
            <p className="subheader h4 spacing after__is-12">
              {description}
            </p>
            <Button
              asAnchor={true}
              className=""
              flavor="regular"
              href={url}
              taste="line">
              Open Gallery
            </Button>
          </div>
        </div>
      );
    }

    renderPartners(partners = []) {
      return (
        <div className="photo-gallery__partners-area">
          <h4 className="label_uppercase ">FOR ADDITIONAL CUSTOMIZED OPTIONS VISIT OUR PARTNER LINKS</h4>
          <div className="photo-gallery__partners">
            {partners.map(({name, slug, url, imageSrc}) => (
              <a
                className="photo-gallery__partner"
                href={url}
                key={`partner-${slug}`}
                rel="noopener noreferrer"
                target="_blank">
                <div className="photo-gallery__partner-image" style={{backgroundImage: `url(${imageSrc})`}} />
                <div className="photo-gallery__partner-description">
                  <div>
                    <div className="photo-gallery__partner-name">
                      {name}
                    </div>
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
      const {modalOpened, imageIndex} = this.state;
      const category = this.getCategoryData();

      const banners = {
        [PRODUCTS.FENCE]: [BANNERS.GATE_BANNER, BANNERS.DRIVEWAY_BANNER],
        [PRODUCTS.GATE]: [BANNERS.FENCE_BANNER, BANNERS.DRIVEWAY_BANNER],
        [PRODUCTS.DRIVEWAY]: [BANNERS.FENCE_BANNER, BANNERS.GATE_BANNER],
      }[productSlug];

      return (
        <div className="photo-gallery">
          <div className="wrapper-1180">
            <span className="breadcrumbs">
              <NavLink><span className="icon home"/></NavLink>
              <ul>
                <li><NavLink to="/">Photo gallery</NavLink></li>
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
            <div className="photo-gallery__banners">
              {banners.map((banner, index) => this.renderBanner(banner, index))}
            </div>
            {category.partners && this.renderPartners(category.partners)}
            <ModalGateway>
              {modalOpened ? (
                <Modal onClose={() => this.setState({modalOpened: false})}>
                  <Carousel
                    currentIndex={imageIndex}
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