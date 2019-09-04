import './slider.scss';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Slider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    currentSlide: PropTypes.number,
  };
  constructor(props) {
    super();
    this.state = {
      slidesCount: props.children.length,
      currentSlide: props.currentSlide || 0,
    };
    this.switchSlide = this.switchSlide.bind(this);
  }
  switchSlide(event) {
    const targetClass = event.target.className;
    const {currentSlide, slidesCount} = this.state;
    let nextSlide = Number(event.target.getAttribute('data-key')) || 0;
    if (targetClass.includes('right')) {
      nextSlide = currentSlide === slidesCount - 1? 0 : currentSlide + 1;
    }
    if (targetClass.includes('left')) {
      nextSlide = currentSlide === 0? slidesCount - 1 : currentSlide - 1;
    }
    this.setState({currentSlide: nextSlide});
  }
  render() {
    const children = this.props.children;
    const {currentSlide} = this.state;
    return (
      <div className="slider-wrapper">
        <div className="slider">
          {children.map((slide, index) => {
            const slideClasses = classNames({
              'slide': true,
              'active': currentSlide === index,
            });
            return <div className={slideClasses} key={index}>{slide}</div>;
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
