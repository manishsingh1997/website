import React, { useState } from 'react';

import { ReactSVG } from 'react-svg';
import classNames from 'classnames';
import { utils } from '@ergeon/core-components';
import { FENCE_SLUG } from '@ergeon/core-components/src/constants';

import AddressForm from '../../../containers/AddressForm';
import { ERGEON1_PHONE, GRASS_PRODUCT } from '../../../website/constants';
import phoneIcon from '../../../assets/icon-phone.svg';

export type SlideProps = {
  name: string,
  title: string,
  subtitle: string,
  isGrass?: boolean,
};

const Slide = (props: SlideProps) => {
  const { name, title, subtitle, isGrass = false } = props;

  const [lead, setLead] = useState('');

  return (
    <div className={classNames('content', name)}>
      <span className="title-wrapper">
        <h1 className="h1 white center">{title}</h1>
        <span className="subheader h2 white center">{subtitle}</span>
      </span>

      <div className="form-wrapper">
        <AddressForm onChange={setLead} product={!isGrass ? FENCE_SLUG : GRASS_PRODUCT} value={lead} />
      </div>
      <a className="phone-link white" href={`tel:${ERGEON1_PHONE}`}>
        <div className="phone-link-icon">
          <ReactSVG src={phoneIcon} />
        </div>
        1-888-ERGEON1&nbsp;<span>(1-{utils.formatPhoneNumber(ERGEON1_PHONE)})</span>
      </a>
    </div>
  );
};

export default Slide;
