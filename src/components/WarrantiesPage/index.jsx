import React from 'react';

import config from 'website/config';
import {ERGEON_LICENSE_NUMBER} from 'website/constants';

import certifiedIcon from 'assets/certified@2x.png';
import licenseImage from 'assets/license.jpg';
import './index.scss';

const PRODUCT_DESCRIPTIONS = `${config.apiHost}/api/store/product-descriptions/`;
const CONTRACTS_DESCRIPTION = 'Our standard contract together with all'
    + ' the associated warranties,'
    + ' assurances, terms and conditions are'
    + ' listed here by state and product';

class WarrantiesPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
    };
    this.getProductContracts().then(
      contracts => this.setState({contracts})
    );
  }

  getProductContracts() {
    return fetch(PRODUCT_DESCRIPTIONS, {mode: 'cors'})
      .then(response => response.json())
      .then(products => products.map(product => {
        const {name, slug, state_products: states} = product;
        return {name, slug, states};
      }));
  }

  renderContractItem(slug, name, contract) {
    return (
      <li key={slug}>
        <a
          href={contract}
          rel="noopener noreferrer"
          target="_blank">
          {name}
        </a>
      </li>
    );
  }

  renderContractHeader({name, slug, states}) {
    const items = states.map(
      state => {
        const {state_name: name, contract} = state;
        const contractSlug = `${slug}-${name}`;
        return this.renderContractItem(contractSlug, name, contract);
      }
    );
    return (
      <React.Fragment key={slug}>
        <h4>{name}</h4>
        <ul>
          {items}
        </ul>
      </React.Fragment>
    );
  }

  renderContractsSection(contracts) {
    if (contracts && contracts.length) {
      const contractsSection = contracts.map(
        contact => this.renderContractHeader(contact)
      );
      return (
        <React.Fragment>
          <h3 className="spacing after__is-12">Our Warranty</h3>
          <p className="subheader h2 spacing after__is-30">{CONTRACTS_DESCRIPTION}</p>
          {contractsSection}
        </React.Fragment>
      );
    }
    return null;
  }

  render() {
    const {contracts} = this.state;
    const contactsSection = this.renderContractsSection(contracts);
    return (
      <div className="warraties-page">
        <div className="warranties-page__header">
          <div className="full-width-block wrapper-1180">
            <div className="spacing after__is-48">
              <h1 className="white spacing after__is-12">
                Licenses & Warranty
              </h1>
              <p className="subheader h2 white width-restricted to-620">
                We are licensed, bonded and insured contractors and promise you&apos;ll be happy with our work.
              </p>
            </div>

          </div>
        </div>
        <div className="warranties-page__content wrapper-1180">
          <h3>Our Licenses</h3>
          <div className="licenses">
            <div className="certifications">
              <div className="certification-item">
                <img className="certified-icon" src={certifiedIcon} />
                <h4>C13 - Fencing</h4>
                <p>Ergeon inc</p>
                <p>License {ERGEON_LICENSE_NUMBER}</p>
              </div>
              <div className="certification-item">
                <img className="certified-icon" src={certifiedIcon} />
                <h4>C27 - Landscaping</h4>
                <p>Ergeon inc</p>
                <p>License {ERGEON_LICENSE_NUMBER}</p>
              </div>
            </div>
            <a
              className="certification-image-link card padding-20 soft-border shadow__z2"
              href={licenseImage}
              rel="noopener noreferrer"
              target="_blank">
              <img className="certification-image" src={licenseImage} />
            </a>
          </div>
          {contactsSection}
        </div>
      </div>
    );
  }
}

export default WarrantiesPage;
