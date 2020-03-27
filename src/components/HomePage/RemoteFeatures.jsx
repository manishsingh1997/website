import React from 'react';

import {Button} from '@ergeon/core-components';

import imgRemoteOnsite from 'assets/remote-features/remote-onsite@2x.jpg';
import imgRemoteQuote from 'assets/remote-features/remote-quote@2x.jpg';
import imgContactless from 'assets/remote-features/contactless-installation@2x.jpg';

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
        <div className="remote-features__card__img" onClick={() => this.toShowVideo(link)}>
          <img alt={title} src={img}/>
        </div>
        <div className="remote-features__card__text-part">
          <h5 className="remote-features__card__title">{title}</h5>
          <p className="remote-features__card__desc">{desc}</p>
          <Button
            flavor="primary"
            onClick={() => this.toShowVideo(link)}
            size="small"
            taste="solid">Watch video</Button>
        </div>
      </div>);
  }
  render() {
    const {currentVideo, videoPopupVisible} = this.state;
    return (
      <div className="remote-features">
        <VideoPopup linkToVideo={currentVideo} onHide={this.toHideVideo.bind(this)} visible={videoPopupVisible}/>
        <div className="wrapper-1180">
          <h3 className="remote-features__title">Here’s how we’re keeping you&nbsp;safe</h3>
          <div className="remote-features__cards">
            {this.renderCard({
              title: 'Remote onsite',
              desc: 'Remote onsite consultation using video call',
              img: imgRemoteOnsite,
              link: 'https://www.youtube.com/embed/7R__Sqr6kR0',
            })}
            <div className="remote-features__card__sep-wrapper">
              <div className="remote-features__card__sep-wrapper__line"/>
            </div>
            {this.renderCard({
              title: 'Remote quoting & payment',
              desc: 'Accurate quote via satellite measurements',
              img: imgRemoteQuote,
              link: 'https://www.youtube.com/embed/4lxXxdeeo7U',
            })}
            <div className="remote-features__card__sep-wrapper">
              <div className="remote-features__card__sep-wrapper__line"/>
            </div>
            {this.renderCard({
              title: 'Contactless installation',
              desc: '3D images and detailed specs for the installer',
              img: imgContactless,
              link: 'https://www.youtube.com/embed/v75a6kK1l-k',
            })}
          </div>
        </div>

      </div>
    );
  }
}

export default RemoteFeatures;
