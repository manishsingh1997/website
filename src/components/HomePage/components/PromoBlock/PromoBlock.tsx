import React, {useMemo} from 'react';
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

  const button = useMemo(() => {
    return (
      <Button asAnchor className="spacing before__is-24" href={btnLink} size="large">
        {btnName}
      </Button>
    )
  }, [btnName])

  return (
    <div className={promoClasses}>
      <div className="promo-block__tablet-button-container">
        {button}
      </div>
      <div className="promo-block__img-container">
        <a href={btnLink}><img alt={title} src={img} /></a>
      </div>
      <div className="promo-block__content">
        <div className="promo-block__content__wrapper">
          <h2 className="h3 spacing after__is-6">{title}</h2>
          <p>{subtitle}</p>
          <div className="promo-block__button-container">
            {button}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromoBlock;
