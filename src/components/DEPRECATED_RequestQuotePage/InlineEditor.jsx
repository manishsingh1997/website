import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '@ergeon/core-components';
import {Viewer, calcUtils} from '@ergeon/3d-lib';

import {getPriceAndDescription} from 'api/lead';

const defaultModel = '?schema=3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,32&' +
  'code=F6,NU,SL8,SS,FT,PK8,RC,POS,PT4,PPT,PD2,PH8,PRZ,KZ,K0,R2,RRC24,LZ,L0,RW0,CZS';

export default class InlineEditor extends React.Component {
  static propTypes = {
    initialConfig: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
    zipcode: PropTypes.string,
  };

  state = {
    editorModel: this.props.initialConfig || defaultModel,
    showControlPanel: true,
    price: 0,
  };

  componentDidMount() {
    const {editorModel} = this.state;
    this.updatePrice(editorModel);
  }

  updatePrice(editorModel) {
    const {zipcode} = this.props;

    return getPriceAndDescription(calcUtils.getValueFromUrl(editorModel), zipcode)
      .then(data => this.setState({price: data['unit_price']}));
  }

  onEditorModelChange(editorModel) {
    this.setState({editorModel});
    this.updatePrice(editorModel);
  }
  render() {
    const {onDone, onClose} = this.props;
    const {price, editorModel} = this.state;

    return (
      <div className="config-cart__editor">
        <Viewer
          isParameterMenuVisible={true}
          onModelChange={this.onEditorModelChange.bind(this)}
          showParameterSelector={true}
          threeDModel={editorModel} />
        <div className="config-cart__editor__control-panel">
          <div className="config-cart__editor__info">
            <div className="label uppercase">
              {price ? `Estimate price: ~$${price}` : null}
            </div>
          </div>
          <div className="config-cart__editor-buttons">
            <Button
              className="config-cart__editor-cancel-button min-width__is-120"
              flavor="regular"
              onClick={onClose}
              taste="line">
              Cancel
            </Button>
            <Button
              className="config-cart__editor-done-button min-width__is-120"
              onClick={() => onDone(editorModel)}>
              Done
            </Button>
          </div>
        </div>
      </div>
    );
  }
}