import React from 'react';
import {Button} from '@ergeon/core-components';
import classNames from 'classnames';

import './PromoBlock.scss';

type PromoBlockProps = {
  btnLink?: string,
  btnName: string,
  className?: string,
  img: string,
  subtitle: string,
  title: string,
}

const PromoBlock = (props: PromoBlockProps) => {
  const {btnLink, btnName, img, subtitle, title, className = ''} = props;

  const promoClasses = classNames({
    'promo-block': true,
    [className]: Boolean(className),
  });

  return (
    <div className={promoClasses}>
      <div className="promo-block__img-container">
        <a href={btnLink}><img alt={title} src={img} /></a>
      </div>
      <div className="promo-block__content">
        <div className="promo-block__content__wrapper">
          <h3 className="spacing after__is-6">{title}</h3>
          <p>{subtitle}</p>
          <Button asAnchor className="spacing before__is-24" href={btnLink} size="large">
            {btnName}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PromoBlock;
