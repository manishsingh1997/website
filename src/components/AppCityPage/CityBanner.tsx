import React, {RefObject} from 'react';

import {ReactSVG} from 'react-svg';
import {Button} from '@ergeon/core-components';
import IconPhone from '@ergeon/core-components/src/assets/icon-call.svg';

import TellUsForm from '../../containers/TellUsForm';

import BannerRating from './components/BannerRating';

import './CityBanner.scss';

type CityBannerProps = {
  city: string;
  phone: string;
  onScrollToLicense?: () => void;
  leadFormRef?: RefObject<HTMLElement>;
};

const CityBanner = (props: CityBannerProps) => {
  const {city, phone, onScrollToLicense, leadFormRef} = props;
  return (
    <section className="CityBanner" data-testid="city-banner">
      <section className="CityBanner-wrapper wrapper-1180">
        <section className="CityBanner-content">
          <aside className="CityBanner-desc">
            <aside className="CityBanner-info">
              <h1 className="h4 is-grey">#1 Fence Company in {city}</h1>
              <h2 className="h2">
                Finally a fence company <br />
                you can trust
              </h2>
              <h3 className="h4">
                Get your fence installed <br />
                by a world-class expert.
              </h3>
              <h3 className="h4">Zero hassle. Fair prices. No hidden fees.</h3>
            </aside>
            <a className="CityBanner-call" href={`tel:+1${phone}`}>
              <Button className="is-action" flavor="action" taste="solid">
                <ReactSVG src={IconPhone} /> Call us now
              </Button>
            </a>
            <BannerRating />
            <h4 className="h6 CityBanner-desc-license-desktop" onClick={onScrollToLicense}>
              See License & warranty information
            </h4>
          </aside>
        </section>
        <p className="is-tablet">or</p>
        <section className="CityBanner-form" ref={leadFormRef}>
          <TellUsForm />
          <h3 className="h6 CityBanner-desc-license-mobile" onClick={onScrollToLicense}>
            See License & warranty information
          </h3>
        </section>
      </section>
    </section>
  );
};

export default CityBanner;
