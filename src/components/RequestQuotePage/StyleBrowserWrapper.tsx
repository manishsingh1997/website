import React from 'react';
import {constants, StyleBrowser} from '@ergeon/3d-lib';
// @ts-ignore
import {tawk} from '@ergeon/erg-utms';
import {getCheckedZIP} from '../../api/lead';
import PopUp from './PopUp';
import './StyleBrowserWrapper.scss';

type StyleBrowserWrapperProps = {
  doneButtonText: string;
  fenceSideLength: number;
  initialSchemaCode: string;
  fenceSideSlopePercent: number,
  onClose: () => void;
  onDone: (model: string) => void;
  onLoaded: () => void;
  showLoadingError: () => void;
  zipcode: string;
};

export default class StyleBrowserWrapper extends React.Component<StyleBrowserWrapperProps> {
  static defaultProps = {
    fenceSideLength: 6,
    fenceSideSlopePercent: 0,
    initialSchemaCode: constants.defaultFenceCode,
  };

  state = {
    model: this.props.initialSchemaCode || constants.defaultFenceCode,
    showPopup: false,
    productAvailability: null,
  };

  componentDidMount() {
    // @ts-ignore
    tawk.tawkAPILoader.then((TawkAPI) => TawkAPI.hideWidget());
    this.openPopup();
    this.checkZipcode();
  }

  componentWillUnmount() {
    // @ts-ignore
    tawk.tawkAPILoader.then((TawkAPI) => TawkAPI.showWidget());
  }

  checkZipcode() {
    const {zipcode, onLoaded} = this.props;
    return getCheckedZIP(zipcode).then((response) => {
      onLoaded();
      this.setState({productAvailability: response.data});
    });
  }

  handleSelectionCompleted(model: string) {
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
    const {model, showPopup} = this.state;
    const {zipcode} = this.props;
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
              shouldUpdateUrl={false}
              zipcode={zipcode}
            />
          </div>
        </PopUp>
      </div>
    );
  }
}
