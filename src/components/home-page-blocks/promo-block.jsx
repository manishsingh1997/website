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
            <h3 className="additional-header h1">{title}</h3>
            <h3 className="additional-header h3">{subtitle}</h3>
            <Button asAnchor={true} href={btnLink}>{btnName}</Button>
          </div>
        </div>
      );
    }
}

export default PromoBlock;