import React, {useMemo, useState} from 'react';

import {isChristmasTime} from '../../../utils/utils';

import Slider from './Slider';

import './SliderHero.scss';

type SliderHeroProps = {
  children: React.ReactNode;
};

const SliderHero = (props: SliderHeroProps) => {
  const {children} = props;

  const christmas = useMemo(() => isChristmasTime(), []);

  const [slide, setSlide] = useState(0);

  return (
    <div className="slider-hero">
      <Slider additionalClassNames={christmas ? 'snow-bg' : ''} onChange={setSlide} slide={slide}>
        {children}
      </Slider>
    </div>
  );
};

export default SliderHero;
