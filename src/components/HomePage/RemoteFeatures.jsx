import React from 'react';

import {Button} from '@ergeon/core-components';

import imgRemoteOnsite from 'assets/remote-features/icon_video-call@2x.svg';
import imgRemoteQuote from 'assets/remote-features/icon_monitor@2x.svg';
import imgContactless from 'assets/remote-features/icon_van@2x.svg';

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
  renderCard({title, desc, img, link}) {
    return (
      <div className="remote-features__card">
        <div className="remote-features__card__img">
          <img alt={title} src={img}/>
        </div>
        <div className="remote-features__card__text-part">
          <h5 className="remote-features__card__title">{title}</h5>
          <p className="remote-features__card__desc">{desc}</p>
          {link && <Button
            flavor="primary"
            onClick={() => this.toShowVideo(link)}
            size="small"
            taste="solid">Watch video</Button>}
        </div>
      </div>);
  }
  render() {
    const {currentVideo, videoPopupVisible} = this.state;
    return (
      <div className="remote-features">
        <VideoPopup linkToVideo={currentVideo} onHide={this.toHideVideo.bind(this)} visible={videoPopupVisible}/>
        <div className="wrapper-1180">
          <h3 className="remote-features__title">Here is how we are keeping you&nbsp;safe</h3>
          <div className="remote-features__cards">
            {this.renderCard({
              title: 'Video Call for Your Onsite Visit',
              // eslint-disable-next-line max-len
              desc: 'Our Team is well equipped to guarantee an accurate quote for your project using satellite imagery and a video call.',
              img: imgRemoteOnsite,
            })}
            <div className="remote-features__card__sep-wrapper">
              <div className="remote-features__card__sep-wrapper__line"/>
            </div>
            {this.renderCard({
              title: 'Approve Your Quote & Pay Online',
              desc: 'You can review, approve, and pay for your quote all online!',
              img: imgRemoteQuote,
            })}
            <div className="remote-features__card__sep-wrapper">
              <div className="remote-features__card__sep-wrapper__line"/>
            </div>
            {this.renderCard({
              title: 'Stay Inside While We Install Your Fence',
              // eslint-disable-next-line max-len
              desc: 'The Construction Team can install with zero physical contact with you and are equipped with full construction details.',
              img: imgContactless,
            })}
          </div>
        </div>

      </div>
    );
  }
}

export default RemoteFeatures;
