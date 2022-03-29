import React from 'react';
import PropTypes from 'prop-types';
import {constants, StyleBrowser} from '@ergeon/3d-lib';
import {getCheckedZIP} from 'api/lead';
import {tawk} from '@ergeon/erg-utms';
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
  };

  componentDidMount() {
    tawk.tawkAPILoader.then(TawkAPI => TawkAPI.hideWidget());
    this.checkZipcode();
  }

  componentWillUnmount() {
    tawk.tawkAPILoader.then(TawkAPI => TawkAPI.showWidget());
  }

  checkZipcode() {
    const {zipcode, onLoaded} = this.props;
    return getCheckedZIP(zipcode).then(response => {
      onLoaded();
      this.setState({productAvailability: response.data});
    });
  }

  handleSelectionCompleted(model) {
    const {onDone} = this.props;
    onDone && onDone(model);
  }

  render() {
    const {model, productAvailability} = this.state;
    return (
      <div className="style-browser-wrapper">
        <PopUp
          onHide={() => this.props.onClose()}
          visible={true}>
          <div>
            <div className="style-browser-wrapper__title">
              <span className="label uppercase">Design your Fence or Gate</span>
            </div>
            <StyleBrowser
              compactView={true}
              doneButtonText={this.props.doneButtonText}
              model={model}
              onComplete={(model) => this.handleSelectionCompleted(model)}
              productAvailability={productAvailability}
              shouldUpdateUrl={false}/>
          </div>

        </PopUp>
      </div>
    );
  }
}
