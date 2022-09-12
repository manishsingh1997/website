import React from 'react';

import {ReactSVG} from 'react-svg';
import ClassNames from 'classnames';
import {utils} from '@ergeon/core-components';
import {FENCE_SLUG} from '@ergeon/core-components/src/constants';

import AddressForm from 'containers/AddressForm';
import {isChristmasTime} from 'utils/utils';

import phoneIcon from '../../assets/icon-phone.svg';
import {ERGEON1_PHONE} from '../../website/constants';

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
          <h1 className="h1 white center">{data.title}</h1>
          <span className="subheader h2 white center">
            Servicing Northern California, Southern California, Dallas, Fort Worth, Houston, and Atlanta.
          </span>
        </span>

        <div className="form-wrapper">
          <AddressForm onChange={this.handleAddressInput.bind(this)} product={product} value={this.state.lead} />
        </div>
        <a className="phone-link white" href={`tel:${ERGEON1_PHONE}`}>
          <div className="phone-link-icon">
            <ReactSVG src={phoneIcon} />
          </div>
          1-888-ERGEON1&nbsp;<span>(1-{utils.formatPhoneNumber(ERGEON1_PHONE)})</span>
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
