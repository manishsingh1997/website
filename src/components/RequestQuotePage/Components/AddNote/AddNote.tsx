import classNames from 'classnames';
import React from 'react';
import {ReactSVG} from 'react-svg';
import crossIcon from '@ergeon/core-components/src/assets/icon-cross-gray.svg';
import {Input} from '@ergeon/core-components';
import './AddNote.scss';

type AddNoteProps = {
  comment: string;
  errors: Record<string, string> | null;
  handleAddNote: () => void;
  handleFieldChange: (event: React.FormEvent<HTMLInputElement>, name: string, value: string) => void;
  handleRemoveNote: () => void;
  loading: boolean;
  showNoteField: boolean;
};

const AddNote = (props: AddNoteProps) => {
  const {showNoteField = false, loading, comment, handleFieldChange, errors, handleAddNote, handleRemoveNote} = props;

  if (showNoteField) {
    return (
      <div className={classNames('Form-field', {'is-error': errors && errors.comment})}>
        <div className="remove-a-note">
          <ReactSVG className="remove-a-note__cross-icon" src={crossIcon} />
          <a className="remove-a-note__link" onClick={handleRemoveNote}>
            Remove
          </a>
        </div>
        <Input
          className="spacing after__is-24"
          isDisabled={loading}
          isValid={(!!comment && !errors?.comment) || null}
          label="Note"
          multiline
          name="comment"
          onChange={handleFieldChange}
          placeholder="Add your note here"
          type="text"
          validationMessage={errors?.comment}
          value={comment}
        />
      </div>
    );
  }

  return (
    <div className="spacing after__is-12">
      <a className="action-link" onClick={handleAddNote}>
        Add a note
      </a>
    </div>
  );
};

export default AddNote;
