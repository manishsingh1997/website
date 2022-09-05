import React, {useCallback, useState} from 'react';

import {Button, OptimizedImage} from '@ergeon/core-components';

import imgRemoteOnsite from '../../../../assets/remote-features/icon-remote-onsite.svg';
import imgRemoteQuote from '../../../../assets/remote-features/icon-pay-online.svg';
import imgContactless from '../../../../assets/remote-features/icon-no-contact-install.svg';
import VideoPopup from '../../VideoPopup';
import './UpcomingRemoteFeatures.scss';

const RemoteFeatures = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const showVideo = useCallback(
    (link: string) => {
      setShowVideoPopup(true);
      setVideoUrl(link);
    },
    [setVideoUrl, setShowVideoPopup]
  );

  const hideVideo = useCallback(() => {
    setShowVideoPopup(false);
  }, [setVideoUrl]);

  const renderCard = useCallback(
    ({title, desc, img, link, videoLink}) => {
      return (
        <div className="remote-features-card">
          <div className="remote-features-card-img">
            <OptimizedImage alt={title} isProcessEnvTest={process.env.NODE_ENV === 'test'} src={img} />
          </div>
          <div className="remote-features-card-details">
            <div className="remote-features-card-info">
              <h3 className="h5 remote-features-card-title">{title}</h3>
              <p className="remote-features-card-desc">{desc}</p>
            </div>
            {videoLink && (
              <Button
                className="remote-features-card-button"
                flavor="primary"
                onClick={() => showVideo(videoLink)}
                size="medium"
                taste="line"
              >
                Learn more
              </Button>
            )}
            {link && (
              <Button
                asAnchor
                className="remote-features-card-button"
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
    },
    [showVideo]
  );

  return (
    <div className="remote-features">
      <div className="remote-features-wrapper">
        <div className="remote-features-title">
          <h2 className="h3">3 Ways We Make Your Installation Easy</h2>
        </div>
        <div className="remote-features-cards">
          {renderCard({
            title: 'Video Call for your Onsite Visit',
            // eslint-disable-next-line max-len
            desc: 'Our Team is well equipped to guarantee an accurate quote for your project using satellite imagery and a video consultation.',
            img: imgRemoteOnsite,
            link: `${process.env.BLOG_HOST}/post/a-walk-through-of-our-remote-experience`,
          })}
          <div className="remote-features-card-sep-wrapper">
            <div className="remote-features-card-sep-wrapper-line" />
          </div>
          {renderCard({
            title: 'Approve your Quote & Pay Online',
            desc: 'You can review, approve, and pay for your quote all online!',
            img: imgRemoteQuote,
            link: `${process.env.BLOG_HOST}/post/how-our-remote-quoting-works`,
          })}
          <div className="remote-features-card-sep-wrapper">
            <div className="remote-features-card-sep-wrapper-line" />
          </div>
          {renderCard({
            title: 'Stay Inside While We Install Your Fence',
            // eslint-disable-next-line max-len
            desc: 'Our Delivery team is ready with all construction details to perform a contact-free installation.',
            img: imgContactless,
            link: `${process.env.BLOG_HOST}/post/contactless-fence-installation`,
          })}
        </div>
      </div>
      <VideoPopup linkToVideo={videoUrl} onHide={hideVideo} visible={showVideoPopup} />
    </div>
  );
};

export default RemoteFeatures;
