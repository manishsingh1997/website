import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@ergeon/core-components';
import classNames from 'classnames';
import './promo-block.scss';

class PromoBlock extends React.Component {
    static propTypes = {
      btnLink: PropTypes.string,
      btnName: PropTypes.string,
      img: PropTypes.string,
      subtitle: PropTypes.string,
      title: PropTypes.string,
    };
    render() {
      const {btnLink, btnName, img, subtitle, title} = this.props;
      const promoClasses = classNames({
        'promo-block': true,
      });
      return (
        <div className={promoClasses}>
          <div className="promo-block__img-container">
            <img src={img}/>
          </div>
          <div className="promo-block__content">
            <div className="promot-block__content__wrapper">
              <h3 className="spacing after__is-6">{title}</h3>
              <p>{subtitle}</p>
              <Button className="spacing before__is-24" href={btnLink} size="large">{btnName}</Button>
            </div>
          </div>
        </div>
      );
    }
}

export default PromoBlock;