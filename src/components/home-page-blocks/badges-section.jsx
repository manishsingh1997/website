import './badges-section.scss';
import React from 'react';
import imgHAbest from '../../assets/ha-best.png';
import imgHAApprove from '../../assets/ha-approved.png';
import imgBBB from '../../assets/bbb.png';
import imgYelp from '../../assets/yelp.png';
import imgCert from '../../assets/certified.png';

class BadgesSection extends React.Component {
  renderBadge({title, subtitle, img}) {
    return (
      <a className="badges-section__badge" href="">
        <div className="badges-section__badge__img-container">
          <img src={img}/>
        </div>
        <div className="badges-section__badge__txt">
          <div>{title}</div>
          <div className="label">{subtitle}</div>
        </div>
      </a>

    );
  }
  render() {
    return (
      <div className="badges-section">
        {this.renderBadge({
          title: 'HomeAdvisor',
          subtitle: 'Screened & Approved',
          img: imgHAbest,
        })}
        {this.renderBadge({
          title: 'HomeAdvisor',
          subtitle: '4.79 rating with 35 reviews',
          img: imgHAApprove,
        })}
        {this.renderBadge({
          title: 'BBB Accredited',
          subtitle: 'A Rated',
          img: imgBBB,
        })}
        {this.renderBadge({
          title: 'Yelp',
          subtitle: '5-star business',
          img: imgYelp,
        })}
        {this.renderBadge({
          title: 'C13 Fencing License',
          subtitle: 'Ergeon Inc License #1040925',
          img: imgCert,
        })}
        {this.renderBadge({
          title: 'C13 Landscaping License',
          subtitle: 'Ergeon Inc License #1040925',
          img: imgCert,
        })}
      </div>
    );
  }
}
export default BadgesSection;
