import React from 'react';
import PropTypes from 'prop-types';
import {constants, StyleBrowser} from '@ergeon/3d-lib';
import {tawk} from '@ergeon/erg-utms';
import {getCheckedZIP} from 'api/lead';
import PopUp from './PopUp';
import './StyleBrowserWrapper.scss';

export default class StyleBrowserWrapper extends React.Component {
  static propTypes = {
    doneButtonText: PropTypes.string,
    fenceSideLength: PropTypes.number,
    initialSchemaCode: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    onLoaded: PropTypes.func.isRequired,
    showLoadingError: PropTypes.func.isRequired,
    zipcode: PropTypes.string,
  };

  static defaultProps = {
    fenceSideLength: 6,
    initialSchemaCode: constants.defaultFenceCode,
  };

  state = {
    model: this.props.initialSchemaCode,
    showPopup: false,
  };

  componentDidMount() {
    tawk.tawkAPILoader.then((TawkAPI) => TawkAPI.hideWidget());
    this.openPopup();
    this.checkZipcode();
  }

  componentWillUnmount() {
    tawk.tawkAPILoader.then((TawkAPI) => TawkAPI.showWidget());
  }

  checkZipcode() {
    const {zipcode, onLoaded} = this.props;
    return getCheckedZIP(zipcode).then((response) => {
      onLoaded();
      this.setState({productAvailability: response.data});
    });
  }

  handleSelectionCompleted(model) {
    const {onDone} = this.props;
    onDone && onDone(model);
  }

  openPopup() {
    this.setState({showPopup: true});
  }

  closePopup() {
    this.props.onClose();
    this.setState({showPopup: false});
  }

  render() {
    const {model, productAvailability, showPopup} = this.state;
    return (
      <div className="style-browser-wrapper">
        <PopUp onHide={this.closePopup.bind(this)} visible={showPopup}>
          <div>
            <div className="style-browser-wrapper__title" data-testid="style-browser">
              <span className="label uppercase">Design your Fence or Gate</span>
            </div>
            <StyleBrowser
              doneButtonText={this.props.doneButtonText}
              model={model}
              onComplete={(model) => this.handleSelectionCompleted(model)}
              productAvailability={productAvailability}
              shouldUpdateUrl={false}
            />
          </div>
        </PopUp>
      </div>
    );
  }
}
