import React from 'react';
import { ReactSVG } from 'react-svg';

import IconCheckMark from '@ergeon/core-components/src/assets/icon-check-mark.svg';
import IconPhoneGreen from '@ergeon/core-components/src/assets/icon-phone-green.svg';

import { City } from './types';

import './MainBanner.scss';

type MainBannerProps = {
  title: City['header']['title'],
  bullets: City['header']['bullets'],
  phone: City['phone'],
  state: City['state'],
}

const MainBanner = (props: MainBannerProps) => {
  const { title, bullets, phone, state } = props;
  return (
    <section className={`MainBanner is-State${state}`}>
      <div className="wrapper-1180 flex-wrapper">
        <section className="flex-spacer MainBanner-content">
          <h1 className="h2 MainBanner-title">{title}</h1>
          <ul className="unordered MainBanner-list">
            {bullets.map(bullet => (
              <li className="MainBanner-listItem" key={bullet}>
                <ReactSVG className="icon" src={IconCheckMark} />
                {bullet}
              </li>
            ))}
          </ul>
          <a className="MainBanner-callLink" href={`tel:${phone.replace(/[^\d]/m, '')}`}>
            <ReactSVG className="icon" src={IconPhoneGreen} />
            <span>Call us now {phone}</span>
          </a>
        </section>
      </div>
    </section>
  )
};

export default MainBanner;
