import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button} from '@ergeon/core-components';
import {Viewer} from '@ergeon/3d-lib';

const defaultModel = '?schema=3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,32' +
  '&code=F6,NU,SL8,BB,FT,PK8,RH,POS,PTS,PTM,PD2,PH8,PRZ,KPT,1K12G,R2,RRC24,LZ,L0,RW0,CZS';

export default function InlineEditor({onDone, onClose, initialConfig}) {
  const [editorModel, setEditorModel] = useState(initialConfig || defaultModel);
  return (
    <div className="config-cart__editor">
      <Viewer
        onModelChange={setEditorModel}
        showParameterSelector
        threeDModel={editorModel} />
      <div className="config-cart__editor-buttons">
        <Button
          className="config-cart__editor-cancel-button"
          flavor="regular"
          onClick={onClose}
          taste="line">
          Cancel
        </Button>
        <Button
          className="config-cart__editor-done-button"
          onClick={() => onDone(editorModel)}>
          Done
        </Button>
      </div>
    </div>
  );
}

InlineEditor.propTypes = {
  initialConfig: PropTypes.string,
  onClose: PropTypes.func,
  onDone: PropTypes.func,
};