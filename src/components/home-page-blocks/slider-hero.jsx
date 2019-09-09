import './slider-hero.scss';
import React from 'react';
import Slider from '../slider';
import ClassNames from 'classnames';
class SliderHero extends React.Component {
  renderSlide(data) {
    const slideClasses = ClassNames({
      content: true,
      fence: data.name === 'fence',
      driveway: data.name === 'driveway',
    });
    return (
      <div className={slideClasses}>
        <span className="title-wrapper">
          <h1 className="white center">{data.title}</h1>
          <span className="subheader__h4 white center">Servicing the Bay Area and Sacramento. License #1040925.</span>
        </span>

        <div className="form-wrapper"/>
        <a className="phone-link white" href="tel:+18559035688">855-903-5688</a>
      </div>
    );
  }
  render() {
    return (
      <Slider className="slider-hero">
        {this.renderSlide({title: 'Fence Installation Service', name: 'fence'})}
        {this.renderSlide({title: 'Driveway Installation Service', name: 'driveway'})}
      </Slider>
    );
  }
}
export default SliderHero;
