import React from 'react';

import {Button} from '@ergeon/core-components';

import imgRemoteOnsite from 'assets/remote-features/icon-remote-onsite.svg';
import imgRemoteQuote from 'assets/remote-features/icon-pay-online.svg';
import imgContactless from 'assets/remote-features/icon-no-contact-install.svg';

import './RemoteFeatures.scss';
import VideoPopup from './VideoPopup';

class RemoteFeatures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVideo: null,
      videoPopupVisible: false,
    };
  }
  toShowVideo(link) {
    this.setState({currentVideo: link, videoPopupVisible: true});
  }
  toHideVideo() {
    this.setState({videoPopupVisible: false});
  }
  renderCard({title, desc, img, link, videoLink}) {
    return (
      <div className="remote-features__card">
        <div className="remote-features__card__img">
          <img alt={title} src={img} />
        </div>
        <div className="remote-features__card__text-part">
          <h5 className="remote-features__card__title">{title}</h5>
          <p className="remote-features__card__desc">{desc}</p>
          {videoLink && (
            <Button
              className="remote-features__card__button"
              flavor="primary"
              onClick={() => this.toShowVideo(videoLink)}
              size="small"
              taste="line"
            >
              Learn more
            </Button>
          )}
          {link && (
            <Button
              asAnchor
              className="remote-features__card__button"
              flavor="primary"
              href={link}
              size="small"
              taste="line"
            >
              Learn more
            </Button>
          )}
        </div>
      </div>
    );
  }
  render() {
    const {currentVideo, videoPopupVisible} = this.state;
    return (
      <div className="remote-features">
        <VideoPopup linkToVideo={currentVideo} onHide={this.toHideVideo.bind(this)} visible={videoPopupVisible} />
        <div className="wrapper-1180">
          <h3 className="remote-features__title">Our Remote Model</h3>
          <div className="remote-features__cards">
            {this.renderCard({
              title: 'Video Call for your Onsite Visit',
              // eslint-disable-next-line max-len
              desc: 'Our Team is well equipped to guarantee an accurate quote for your project using satellite imagery and a video consultation.',
              img: imgRemoteOnsite,
              videoLink: 'https://www.youtube.com/embed/HJh1auVQfV8',
            })}
            <div className="remote-features__card__sep-wrapper">
              <div className="remote-features__card__sep-wrapper__line" />
            </div>
            {this.renderCard({
              title: 'Approve your Quote & Pay Online',
              desc: 'You can review, approve, and pay for your quote all online!',
              img: imgRemoteQuote,
              link: `${process.env.BLOG_HOST}/post/how-our-remote-quoting-works`,
            })}
            <div className="remote-features__card__sep-wrapper">
              <div className="remote-features__card__sep-wrapper__line" />
            </div>
            {this.renderCard({
              title: 'Stay Inside While we Install',
              // eslint-disable-next-line max-len
              desc: 'Our Delivery team is fully equipped with all construction details to perform a contact-free installation.',
              img: imgContactless,
              link: `${process.env.BLOG_HOST}/post/contactless-fence-installation`,
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default RemoteFeatures;
