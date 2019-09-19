import React from 'react';
import {find} from 'lodash';
import certifiedIcon from 'assets/certified@2x.png';
import licenseImage from 'assets/license.jpg';
import './warranties-page.scss';

const pdfjsLib = window.pdfjsLib || {};
const WARRANTIES_URL_DEV = 'https://apidev.ergeon.in/api/store/product-descriptions/';
const WARRANTIES_URL_PROD = 'https://api.ergeon.in/api/store/product-descriptions/';
const WARRANTIES_URL = (document.location.host || '').includes('www.ergeon.com') ?
  WARRANTIES_URL_PROD :
  WARRANTIES_URL_DEV;
const DEFAULT_PRODUCTS = [
  {
    name: 'Driveway Installation',
    slug: 'driveway-installation',
    ['warranty_url']: 'https://s3-us-west-2.amazonaws.com/ergeon.com/warranty/concrete_warranty_2019.pdf',
  },
  {
    name: 'Fence Installation',
    slug: 'fence-replacement',
    ['warranty_url']: 'https://s3-us-west-2.amazonaws.com/ergeon.com/warranty/fence_warranty_2019.pdf',
  },
];

class WarrantiesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      warranties: [],
    };

    this.getWarranties()
      .then(warranties => {
        this.refs = {};
        warranties.forEach(warranty => this.refs[warranty.slug] = React.createRef());
        this.setState({warranties});
      });
  }

  getWarranties() {
    return fetch(WARRANTIES_URL, {mode: 'cors'})
      .then(response => response.json())
      .then(function(products) {
        return products.map(function(product) {
          const productInDefaults = find(DEFAULT_PRODUCTS, {slug: product.slug});

          if (product.warranty_url) return product;
          else if (productInDefaults) {
            return Object.assign({}, product, {['warranty_url']: productInDefaults['warranty_url']});
          }
          return null;
        });
      })
      .then(products => products.filter(product => product))
      .catch(() => DEFAULT_PRODUCTS);
  }

  generatePdfPreview(canvas, url) {
    const canvasContext = canvas.getContext('2d');

    return pdfjsLib.getDocument({url})
      .then(doc => doc.getPage(1))
      .then(function(page) {
        const scaleRequired = canvas.width / page.getViewport(1).width;
        const viewport = page.getViewport(scaleRequired);

        return page.render({
          canvasContext,
          viewport,
        });
      })
      .catch(() => {
        canvas.width = 0;
        canvas.height = 0;
      });
  }

  renderWarranty({warranty_url: warrantyUrl, slug}) {
    return (
      <a
        href={warrantyUrl}
        key={`warranty-${slug}`}
        rel="noopener noreferrer"
        style={{padding: 10}}
        target="_blank">
        <div className="warranty">
          <canvas
            className="warranty__canvas"
            height="250"
            ref={element => this.generatePdfPreview(element, warrantyUrl)}
            width="349">
          </canvas>
        </div>
      </a>
    );
  }

  render() {
    const {warranties} = this.state;

    return (
      <div className="warraties-page">
        <div className="warranties-page__header">
          <div className="full-width-block wrapper-1180">
            <h1 className="white">Licenses & warranty</h1>
            <p className="subheader h2 white">
              We are licensed, bonded and insured contractors and promise you&apos;ll be happy with our work.
            </p>
          </div>
        </div>
        <div className="warranties-page__content wrapper-1180">
          <h4>Our Licenses</h4>
          <div className="licenses">
            <div className="certifications">
              <div className="certification-item">
                <img className="certified-icon" src={certifiedIcon} />
                <h4 className="heading-16">C13 - Fencing</h4>
                <p>Ergeon inc</p>
                <p>License #1040925</p>
              </div>
              <div className="certification-item">
                <img className="certified-icon" src={certifiedIcon} />
                <h4 className="heading-16">C27 - Landscaping</h4>
                <p>Ergeon inc</p>
                <p>License #1040925</p>
              </div>
            </div>
            <a className="certification-image-link" href={licenseImage}>
              <img className="certification-image" src={licenseImage} />
            </a>
          </div>
          <h4>Warranty</h4>
          <div className="warranties">
            {warranties.map(this.renderWarranty.bind(this))}
          </div>
        </div>
      </div>
    );
  }
}

export default WarrantiesPage;