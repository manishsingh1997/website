import React from 'react';
import ClassNames from 'classnames';

import {PHONE_NUMBER} from '@ergeon/core-components/src/constants';
import {formatPhoneNumber} from '@ergeon/core-components/src/libs/utils/utils';
import AddressForm from 'containers/AddressForm';
import {isChristmasTime} from 'utils/utils';
import Slider from './Slider';
import {FENCE_SLUG} from '@ergeon/core-components/src/constants';
import {getParameterByName} from 'utils/utils';

const AUTO_SLIDE_INTERVAL_SECONDS = 5;

import './SliderHero.scss';

class SliderHero extends React.Component {
  constructor(props) {
    super(props);
    this.isChristmasTime = isChristmasTime();
    this.state = {
      slide: getParameterByName('utm_content') === 'driveway' ? 1 : 0,
      lead: '',
    };
    this.autoSlide = setInterval(
      () => this.setState({slide: (this.state.slide + 1) % 2}),
      AUTO_SLIDE_INTERVAL_SECONDS * 1000
    );
  }

  componentWillUnmount() {
    this.clearAutoSlide();
  }

  clearAutoSlide() {
    clearInterval(this.autoSlide);
  }

  handleSlideChange(slide) {
    this.clearAutoSlide();
    this.setState({slide});
  }

  handleAddressInput(leadValue) {
    this.setState((prev) => ({...prev, lead: leadValue}));
  }

  renderSlide(data) {
    const slideClasses = ClassNames({
      content: true,
      fence: data.name === 'fence',
      driveway: data.name === 'driveway',
    });
    const product = FENCE_SLUG;
    return (
      <div className={slideClasses} onFocus={() => this.clearAutoSlide()}>
        <span className="title-wrapper">
          <h1 className="h0 white center">{data.title}</h1>
          <span className="subheader h2 white center">
            Servicing Northern California, Southern California, Dallas and Fort Worth.
          </span>
        </span>

        <div className="form-wrapper">
          <AddressForm onChange={this.handleAddressInput.bind(this)} product={product} value={this.state.lead} />
        </div>
        <a className="phone-link white" href={`tel:${PHONE_NUMBER}`}>
          {formatPhoneNumber(PHONE_NUMBER)}
        </a>
      </div>
    );
  }

  render() {
    const additionalClassNames = this.isChristmasTime ? 'snow-bg' : '';
    const {slide} = this.state;
    return (
      <div className="slider-hero">
        <Slider additionalClassNames={additionalClassNames} onChange={this.handleSlideChange.bind(this)} slide={slide}>
          {this.renderSlide({title: 'Fence Installation Service', name: 'fence'})}
          {this.renderSlide({title: 'Driveway Installation Service', name: 'driveway'})}
        </Slider>
      </div>
    );
  }
}

export default SliderHero;
