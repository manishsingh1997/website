import React, {useMemo} from 'react';

import {ReactSVG} from 'react-svg';
import iconVerified from '@ergeon/core-components/src/assets/icon-verified-small.svg';
import {OptimizedImage} from '@ergeon/core-components';

import licensesAndWarrantiesImg from '../../assets/licenses-and-warranties.jpg';

import {getAsset} from './utils';
import {City} from './types';

import './LicensesAndWarranty.scss';

type LicensesAndWarrantyProps = {
  cityItem: City;
};

const LicensesAndWarranty = (props: LicensesAndWarrantyProps) => {
  const {cityItem} = props;

  const cityLicense = useMemo(() => {
    const description = `${cityItem.city} contractors/business license for fence installation is not required.`;

    return (
      <div className="spacing after__is-30">
        <h3 className="h5 spacing after__is-6">{cityItem.city} License</h3>
        <p>{cityItem.license?.description ?? description}</p>
      </div>
    );
  }, [cityItem]);

  const stateLicense = useMemo(() => {
    const stateFullName = cityItem.state_full_name;
    const licenseNumber = cityItem.license?.state_number;
    const noLicenseDescription = `${stateFullName} state contractors license for fence installation is not required.`;
    const licenseDescription = `${stateFullName} state License #${licenseNumber}`;

    return (
      <div className="StateLicense spacing after__is-30">
        <h3 className="h5 spacing after__is-6">{stateFullName} License</h3>
        <p>{licenseNumber ? licenseDescription : noLicenseDescription}</p>
        {!!cityItem.licenses?.length && (
          <div className="StateLicense-licenseTypes">
            {cityItem.licenses?.map((item, index) => (
              <div className="IconWithText" key={`${item}-${index}`}>
                <ReactSVG className="is-LicenseIcon" src={iconVerified} />
                <a aria-label={`Visit the license of ${cityItem.city}`} 
                    className="LicenseWithLink" href={cityItem.license?.url} target={'__blank'}>
                  {item}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }, [cityItem]);

  const warranty = useMemo(() => {
    return (
      <div className="spacing after__is-30">
        <h3 className="h5 spacing after__is-6">Ergeon Warranty</h3>
        <p className="spacing after__is-30">
          Your project is covered by our warranty and assurances.&nbsp;
          <a aria-label="Lean more about our warranty and assurances" href={cityItem.warranty} target="__blank">
            Learn more
          </a>
        </p>
      </div>
    );
  }, [cityItem]);

  const licenseImg = useMemo(() => {
    return cityItem.license?.img ? getAsset(cityItem.license?.img, 'jpeg') : licensesAndWarrantiesImg;
  }, [cityItem.license?.img]);

  const licensePdf = useMemo(() => {
    return cityItem.license?.pdf && getAsset(cityItem.license?.pdf, 'pdf');
  }, [cityItem.license?.pdf]);

  return (
    <div className="LicensesAndWarranty Regulations-container">
      <div className="flex-wrapper">
        <div className="flex-spacer LicensesAndWarranty-row">
          <h2 className="h3 spacing after__is-30">{cityItem.city} Licenses & Warranty</h2>
          {cityLicense}
          {stateLicense}
          {warranty}
        </div>

        <div className="flex-spacer LicensesAndWarranty-row">
          <a className="LicenseWithLink" href={licensePdf} target={'__blank'}>
            <OptimizedImage alt="Licenses And Warranty" src={licenseImg} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LicensesAndWarranty;
