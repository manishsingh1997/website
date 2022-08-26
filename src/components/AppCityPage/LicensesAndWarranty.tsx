import React, {useMemo} from 'react';

import {ReactSVG} from 'react-svg';
import iconVerified from '@ergeon/core-components/src/assets/icon-verified-small.svg';

import licensesAndWarrantiesImg from '../../assets/licenses-and-warranties.jpg';

import {City} from './types';

import './LicensesAndWarranty.scss';

type LicensesAndWarrantyProps = {
  cityItem: City;
};

const LicensesAndWarranty = (props: LicensesAndWarrantyProps) => {
  const {cityItem} = props;

  const cityLicense = useMemo(() => {
    return (
      <div className="spacing after__is-30">
        <h3 className="h5 spacing after__is-6">{cityItem.city} License</h3>
        <p>{cityItem.city} contractors/business license for fence installation is not required.</p>
      </div>
    );
  }, [cityItem.city]);

  const stateLicense = useMemo(() => {
    return (
      <div className="StateLicense spacing after__is-30">
        <h3 className="h5 spacing after__is-6">California License</h3>
        <p>California state License #1040925</p>
        <div className="StateLicense-licenseTypes">
          {cityItem.licenses?.map((item, index) => (
            <div className="IconWithText" key={`${item}-${index}`}>
              <ReactSVG className="is-LicenseIcon" src={iconVerified} />
              <a className="LicenseWithLink" href={cityItem.license.url} target={'__blank'}>
                {item}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }, [cityItem.license]);

  const warranty = useMemo(() => {
    return (
      <div className="spacing after__is-30">
        <h3 className="h5 spacing after__is-6">Ergeon Warranty</h3>
        <a
          className="spacing after__is-30"
          href={
            'https://api-ergeon-in.s3.amazonaws.com/products/fence-replacement/CA/contracts/Ergeon_California_Construction_Contract_2022.pdf'
          }
          target="__blank"
        >
          California fence installation contract & associated warranties, assurances, terms and conditions.
        </a>
      </div>
    );
  }, []);

  return (
    <div className="LicensesAndWarranty flex-wrapper Regulations-container">
      <div className="flex-spacer LicensesAndWarranty-row">
        <h2 className="h3 spacing after__is-30">{cityItem.city} Licenses & Warranty</h2>
        {cityLicense}
        {stateLicense}
        {warranty}
      </div>
      <div className="flex-spacer LicensesAndWarranty-row">
        <img src={licensesAndWarrantiesImg} />
      </div>
    </div>
  );
};

export default LicensesAndWarranty;
