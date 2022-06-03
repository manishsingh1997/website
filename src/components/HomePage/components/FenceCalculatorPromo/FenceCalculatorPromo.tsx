import React from 'react';
import imgCalc from '../../../../assets/fence-calculator-promo-1.png';
import PromoBlock from '../PromoBlock';

const FenceCalculatorPromo = () => {
  return (
    <PromoBlock
      btnLink={process.env.FENCEQUOTING_HOST}
      btnName="Fence Calculator"
      img={imgCalc}
      subtitle="Build your dream fence and get an estimate instantly"
      title="Try Our Fence Calculator"
    />
  )
}

export default FenceCalculatorPromo;
