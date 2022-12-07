import React from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import './VideoPopup.scss';

class VideoPopup extends React.Component {
  static propTypes = {
    linkToVideo: PropTypes.string,
    onHide: PropTypes.func,
    visible: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
    };
  }

  render() {
    const {linkToVideo, visible, onHide} = this.props;
    const containerClasses = classNames({
      'video-popup': true,
    });
    const fogClasses = classNames({
      'fog-popup': true,
      display: visible,
    });
    const aspectRatio = 1.5;
    const suggestedWidth = window.innerWidth - window.innerWidth * 0.2;
    const iframeWidth = suggestedWidth > 1080 ? 1080 : suggestedWidth;
    const iframeHeight = iframeWidth / aspectRatio;
    return (
      <div className="video-popup__wrapper">
        {visible && (
          <div className={containerClasses}>
            <iframe
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
              height={iframeHeight}
              src={`${linkToVideo}?autoplay=1`}
              width={iframeWidth}
            />
          </div>
        )}
        <div className={fogClasses} onClick={onHide} />
      </div>
    );
  }
}

export default VideoPopup;
