import React from 'react';

import {ERGEON_LICENSE_NUMBER, ERGEON_GEORGIA_LICENSE_NUMBER} from 'website/constants';

import certifiedIcon from 'assets/certified@2x.png';
import licenseImage from 'assets/license.jpg';
import './index.scss';

const CA_LICENSES = [
  'C13 - Fencing',
  'C27 - Landscaping',
  'C8 - Concrete',
];
const PRODUCT_DESCRIPTIONS = `${process.env.API_HOST}/api/store/product-descriptions/`;
const CONTRACTS_DESCRIPTION =
  'Our standard contract together with all' +
  ' the associated warranties,' +
  ' assurances, terms and conditions are' +
  ' listed here by state and product';

class WarrantiesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
    };
    this.getProductContracts().then((contracts) => this.setState({contracts}));
  }

  getProductContracts() {
    return fetch(PRODUCT_DESCRIPTIONS, {mode: 'cors'})
      .then((response) => response.json())
      .then((products) =>
        products.map((product) => {
          const {name, slug, state_products: states} = product;
          return {name, slug, states};
        })
      );
  }

  renderContractItem(slug, name, contract) {
    return (
      <li key={slug}>
        <a href={contract} rel="noopener noreferrer" target="_blank">
          {name}
        </a>
      </li>
    );
  }

  renderContractHeader({name, slug, states}) {
    const items = states.map((state) => {
      const {state_name: name, contract} = state;
      const contractSlug = `${slug}-${name}`;
      return this.renderContractItem(contractSlug, name, contract);
    });
    return (
      <React.Fragment key={slug}>
        <h3 className="h4">{name}</h3>
        <ul>{items}</ul>
      </React.Fragment>
    );
  }

  renderContractsSection(contracts) {
    if (contracts && contracts.length) {
      const contractsSection = contracts.map((contact) => this.renderContractHeader(contact));
      return (
        <React.Fragment>
          <h2 className="h3 spacing after__is-12">Our Warranty</h2>
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
              <h1 className="white spacing after__is-12">Licenses & Warranty</h1>
              <p className="subheader h2 white width-restricted to-620">
                We are licensed, bonded and insured contractors and promise you&apos;ll be happy with our work.
              </p>
            </div>
          </div>
        </div>
        <div className="warranties-page__content wrapper-1180">
          <h2 className="h3">Our Licenses</h2>
          <div className="licenses spacing after__is-48">
            <div className="certifications spacing after__is-48">
              {CA_LICENSES.map(licenseName => (
                <div className="certification-item" key={licenseName}>
                  <img className="certified-icon" src={certifiedIcon} />
                  <h3 className="h4">{licenseName}</h3>
                  <p>Ergeon Inc</p>
                  <p>License {ERGEON_LICENSE_NUMBER}</p>
                </div>
              ))}
              <div className="certification-item">
                <img className="certified-icon" src={certifiedIcon} />
                <h3 className="h4">Residential/General contractor</h3>
                <p>Ergeon Inc</p>
                <p>License {ERGEON_GEORGIA_LICENSE_NUMBER}</p>
              </div>
            </div>
            <a
              className="certification-image-link card padding-20 soft-border shadow__z2"
              href={licenseImage}
              rel="noopener noreferrer"
              target="_blank"
            >
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
