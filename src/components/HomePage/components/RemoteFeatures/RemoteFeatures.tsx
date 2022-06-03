import React from 'react';

import {Button} from '@ergeon/core-components';

import imgRemoteOnsite from '../../../../assets/remote-features/icon-remote-onsite.svg';
import imgRemoteQuote from '../../../../assets/remote-features/icon-pay-online.svg';
import imgContactless from '../../../../assets/remote-features/icon-no-contact-install.svg';
import VideoPopup from '../../VideoPopup';

import './RemoteFeatures.scss';

type RemoteFeaturesState = {
  currentVideo: null | string,
  videoPopupVisible: boolean,
}

type renderCardProps = {
  title: string,
  desc: string,
  img: string,
  link: string,
  videoLink?: string,
}

class RemoteFeatures extends React.Component<Record<string, never>, RemoteFeaturesState> {
  constructor(props: never) {
    super(props);
    this.state = {
      currentVideo: null,
      videoPopupVisible: false,
    };
  }
  toShowVideo(link: string) {
    this.setState({currentVideo: link, videoPopupVisible: true});
  }
  toHideVideo() {
    this.setState({videoPopupVisible: false});
  }
  renderCard({title, desc, img, link, videoLink}: renderCardProps) {
    return (
      <div className="remote-feature__card">
        <div className="remote-feature__card__img">
          <img alt={title} src={img} />
        </div>
        <div className="remote-feature__card__text-part">
          <h5 className="remote-feature__card__title">{title}</h5>
          <p className="remote-feature__card__desc">{desc}</p>
          {videoLink && (
            <Button
              className="remote-feature__card__button"
              flavor="primary"
              onClick={() => this.toShowVideo(videoLink)}
              size="medium"
              taste="line"
            >
              Learn more
            </Button>
          )}
          {link && (
            <Button
              asAnchor
              className="remote-feature__card__button"
              flavor="primary"
              href={link}
              size="medium"
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
      <div className="remote-feature">
        <VideoPopup linkToVideo={currentVideo} onHide={this.toHideVideo.bind(this)} visible={videoPopupVisible} />
        <div className="wrapper-1180">
          <h3 className="remote-feature__title">How We Make Home Improvement Easy</h3>
          <div className="remote-feature__cards">
            {this.renderCard({
              title: 'Video Call for your Onsite Visit',
              desc: 'Our Team is well equipped to guarantee an accurate quote for your project using satellite' +
                ' imagery and a video call.',
              img: imgRemoteOnsite,
              link: `${process.env.BLOG_HOST}/post/a-walk-through-of-our-remote-experience`,
            })}
            <div className="remote-feature__card__sep-wrapper">
              <div className="remote-feature__card__sep-wrapper__line" />
            </div>
            {this.renderCard({
              title: 'Approve your Quote & Pay Online',
              desc: 'You can review, approve, and pay for your quote all online!',
              img: imgRemoteQuote,
              link: `${process.env.BLOG_HOST}/post/how-our-remote-quoting-works`,
            })}
            <div className="remote-feature__card__sep-wrapper">
              <div className="remote-feature__card__sep-wrapper__line" />
            </div>
            {this.renderCard({
              title: 'Stay Inside While We Install Your Fence',
              desc: 'The Construction Team can install with zero physical contact with you and are equipped with' +
                ' full construction details.',
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
