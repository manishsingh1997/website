import './badges-section.scss';
import React from 'react';
import imgHAApprove from '../../assets/ha-approved.png';
import imgBBB from '../../assets/bbb.png';
import imgYelp from '../../assets/yelp.png';
import imgCert from '../../assets/certified.png';
import imgGoogleReview from '../../assets/google-logo.png';

class BadgesSection extends React.Component {
  renderBadge({title, subtitle, img, url}) {
    return (
      <a className="badges-section__badge" href={url} rel="noopener noreferrer" target="_blank">
        <div className="badges-section__badge__img-container">
          <img src={img}/>
        </div>
        <div className="badges-section__badge__txt">
          <h6 className="spacing after__is-6">{title}</h6>
          <div className="label">{subtitle}</div>
        </div>
      </a>

    );
  }
  render() {
    return (
      <div className="badges-section">
        <div className="badges-section__row">
          {this.renderBadge({
            title: 'HomeAdvisor',
            subtitle: '4.8 rating with 38 reviews',
            img: imgHAApprove,
            url: 'https://www.homeadvisor.com/rated.ErgeonPaloAlto.66624661.html',
          })}
          {this.renderBadge({
            title: 'Google',
            subtitle: '4.9 rating with 23 reviews',
            img: imgGoogleReview,
            url: 'https://www.google.com/maps?cid=13156437773994721266&hl=en',
          })}
          {this.renderBadge({
            title: 'Yelp',
            subtitle: '5-star business',
            img: imgYelp,
            url: 'https://www.yelp.com/biz/ergeon-palo-alto-3',
          })}
        </div>
        <div className="badges-section__row">
          {this.renderBadge({
            title: 'BBB Accredited',
            subtitle: 'A Rated',
            img: imgBBB,
            url: 'https://www.bbb.org/us/ca/palo-alto/profile/landscape-contractors/ergeon-1216-896246',
          })}
          {this.renderBadge({
            title: 'C13 Fencing License',
            subtitle: 'Ergeon Inc License #1040925',
            img: imgCert,
            url: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=1040925',
          })}
          {this.renderBadge({
            title: 'C27 Landscaping License',
            subtitle: 'Ergeon Inc License #1040925',
            img: imgCert,
            url: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=1040925',
          })}
        </div>
      </div>
    );
  }
}
export default BadgesSection;
