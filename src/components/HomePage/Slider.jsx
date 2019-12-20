import React from 'react';
import PropTypes from 'prop-types';
import {Swipeable} from 'react-swipeable';
import classNames from 'classnames';

import './Slider.scss';

class Slider extends React.Component {
  static propTypes = {
    additionalClassNames: PropTypes.string,
    children: PropTypes.node,
    defaultSlide: PropTypes.number,
  };
  constructor(props) {
    super();
    this.state = {
      slidesCount: props.children.length,
      currentSlide: props.defaultSlide || 0,
    };
    this.switchSlide = this.switchSlide.bind(this);
  }
  switchSlide(event) {
    const targetClass = event.target
      ? event.target.className
      : event.dir // event has dir (direction) if was called by swipe
        ? event.dir
        : null;
    const {currentSlide, slidesCount} = this.state;
    let nextSlide = Number(event.target? event.target.getAttribute('data-key') : 0) || 0;
    if (targetClass.toLowerCase().includes('right')) {
      nextSlide = currentSlide === slidesCount - 1? 0 : currentSlide + 1;
    }
    if (targetClass.toLowerCase().includes('left')) {
      nextSlide = currentSlide === 0? slidesCount - 1 : currentSlide - 1;
    }
    this.setState({currentSlide: nextSlide});
  }
  render() {
    const {children, additionalClassNames} = this.props;
    const {currentSlide} = this.state;
    const swipeConfig = {
      // delta: 10,
      preventDefaultTouchmoveEvent: false,
      trackTouch: true,
      trackMouse: true,
    };

    return (

      <div className={`slider-wrapper ${additionalClassNames || ''}`}>
        <div className="slider">
          {children.map((slide, index) => {
            const slideClasses = classNames({
              'slide': true,
              'active': currentSlide === index,
            });
            return (
              <Swipeable key={index} onSwiped={(eventData) => this.switchSlide(eventData)} {...swipeConfig}>
                <div className={slideClasses} key={index}>{slide}</div>
              </Swipeable>
            );
          })}
        </div>
        <div className="points">
          {children.map((slide, index) => {
            if (currentSlide === index) {
              return <div className="point active" data-key={index} key={index} onClick={this.switchSlide}/>;
            }
            return <div className="point" data-key={index} key={index} onClick={this.switchSlide}/>;
          })}
        </div>
        <div className="arrow left" onClick={this.switchSlide} onTouchEnd={this.switchSlide}/>
        <div className="arrow right" onClick={this.switchSlide} onTouchEnd={this.switchSlide}/>
      </div>

    );
  }
}
export default Slider;
