import React from 'react';
import propTypes from 'prop-types';
import {ReactSVG} from 'react-svg';
import crossIcon from '@ergeon/core-components/src/assets/icon-cross-gray.svg';
import classNames from 'classnames';
import './AddNote.scss';
import TextArea from '../common/TextArea';

export default class AddNote extends React.Component {
  static propTypes = {
    comment: propTypes.string,
    errors: propTypes.object,
    handleAddNote: propTypes.func.isRequired,
    handleFieldChange: propTypes.func.isRequired,
    handleRemoveNote: propTypes.func.isRequired,
    loading: propTypes.bool,
    showNoteField: propTypes.bool,
  };
  static defaultProps = {
    showNoteField: false,
  };
  render() {
    const {showNoteField, loading, comment, handleFieldChange, errors, handleAddNote, handleRemoveNote} = this.props;
    return (
      <React.Fragment>
        {showNoteField === false ? (
          <div className="spacing after__is-12">
            <a
              className="action-link"
              onClick={handleAddNote}>
              Add a note
            </a>
          </div>
        ) : (
          <div className={classNames('Form-field', {'is-error': errors && errors.comment})}>
            <div className="remove-a-note">
              <ReactSVG className="remove-a-note__cross-icon" src={crossIcon}/>
              <a
                className="remove-a-note__link"
                onClick={handleRemoveNote}>
                Remove
              </a>
            </div>
            <TextArea
              disabled={loading}
              labelName="Note"
              name="comment"
              onChange={handleFieldChange}
              placeholder="Add your note here"
              type="text"
              value={comment} />
            {errors && <div className="Form-error">{errors.comment}</div>}
          </div>
        )}
      </React.Fragment>
    );
  }
}
