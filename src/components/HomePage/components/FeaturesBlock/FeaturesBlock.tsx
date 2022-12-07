import React from 'react';

import { OptimizedImage } from '@ergeon/core-components';

import imgSmile from '../../../../assets/trusted/icon-communication.svg';
import imgTrusted from '../../../../assets/trusted/icon-erg-hart.svg';
import imgCard from '../../../../assets/trusted/icon-lightbulb.svg';
import imgBuck from '../../../../assets/trusted/icon-reliable-transparent.svg';

import './FeaturesBlock.scss';

const FeaturesBlock = () => {
  return (
    <div className="get-started__features">
      <div className="get-started__features__feature">
        <OptimizedImage alt={'Trusted provider'} src={imgTrusted} />
        <h6>Trusted provider</h6>
      </div>
      <div className="get-started__features__feature">
        <OptimizedImage alt={'High tech, easy to use'} src={imgCard} />
        <h6>High tech, easy to use</h6>
      </div>
      <div className="get-started__features__feature">
        <OptimizedImage alt={'Reliable and transparent'} src={imgBuck} />
        <h6>Reliable and transparent</h6>
      </div>
      <div className="get-started__features__feature">
        <OptimizedImage alt={'Excellent communication'} src={imgSmile} />
        <h6>Excellent communication</h6>
      </div>
    </div>
  );
};

export default FeaturesBlock;
