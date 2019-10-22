import './slider-hero.scss';
import React from 'react';
import Slider from '../slider';
import ClassNames from 'classnames';
import {PHONE_NUMBER} from '@ergeon/core-components/src/constants';
import {formatPhoneNumber} from '@ergeon/core-components/src/libs/utils/utils';
import AddressForm from './address-form';
import {FENCE_SLUG, DRIVEWAY_SLUG} from 'libs/constants';
import {getParameterByName} from 'libs/utils/utils';

class SliderHero extends React.Component {
  renderSlide(data) {
    const slideClasses = ClassNames({
      content: true,
      fence: data.name === 'fence',
      driveway: data.name === 'driveway',
    });
    const product = data.name ? FENCE_SLUG : DRIVEWAY_SLUG;

    return (
      <div className={slideClasses}>
        <span className="title-wrapper">
          <h1 className="h0 white center">{data.title}</h1>
          <span className="subheader h2 white center">
            Servicing the Bay Area, Sacramento and Fresno. License #1040925.
          </span>
        </span>

        <div className="form-wrapper">
          <AddressForm product={product} showProductField />
        </div>
        <a className="phone-link white" href={`tel:${PHONE_NUMBER}`}>{formatPhoneNumber(PHONE_NUMBER)}</a>
      </div>
    );
  }
  render() {
    return (
      <Slider className="slider-hero" defaultSlide={getParameterByName('utm_content') === 'driveway' ? 1 : 0}>
        {this.renderSlide({title: 'Fence Installation Service', name: 'fence'})}
        {this.renderSlide({title: 'Driveway Installation Service', name: 'driveway'})}
      </Slider>
    );
  }
}

export default SliderHero;
