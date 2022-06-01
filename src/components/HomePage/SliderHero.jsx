import React from 'react';
import ClassNames from 'classnames';

import {PHONE_NUMBER,FENCE_SLUG} from '@ergeon/core-components/src/constants';
import {formatPhoneNumber} from '@ergeon/core-components/src/libs/utils/utils';
import AddressForm from 'containers/AddressForm';
import {isChristmasTime} from 'utils/utils';
import Slider from './Slider';

import './SliderHero.scss';

class SliderHero extends React.Component {
  constructor(props) {
    super(props);
    this.isChristmasTime = isChristmasTime();
    this.state = {
      slide: 0,
      lead: '',
    };
  }

  handleSlideChange(slide) {
    this.setState({slide});
  }

  handleAddressInput(leadValue) {
    this.setState((prev) => ({...prev, lead: leadValue}));
  }

  renderSlide(data) {
    const slideClasses = ClassNames({
      content: true,
      fence: data.name === 'fence',
    });
    const product = FENCE_SLUG;
    return (
      <div className={slideClasses}>
        <span className="title-wrapper">
          <h1 className="h0 white center">{data.title}</h1>
          <span className="subheader h2 white center">
          Servicing Northern California, Southern California, Dallas, Fort Worth, Houston, and Atlanta.
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
        </Slider>
      </div>
    );
  }
}

export default SliderHero;
