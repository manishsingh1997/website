import React from 'react';
import PropTypes from 'prop-types';
import {ReactSVG} from 'react-svg';

import {Input, PhoneInput, Button} from '@ergeon/core-components';
import PlusIcon from '@ergeon/core-components/src/assets/icon-plus.svg';
import MinusIcon from '@ergeon/core-components/src/assets/icon-minus.svg';

import DataRow from 'components/common/DataRow';

export default function AdditionalContactInfo({title, label, contactInfos, onAdd, onRemove, onChange}) {
  const onAddHandler = (event) => {
    event.preventDefault();
    onAdd(label);
  };

  const contactsRender = contactInfos.map((contactInfo) => {
    const inputProps = {
      label,
      onChange,
      pk: contactInfo.id,
      name: Math.random().toString(36).substr(2, 9),
      value: contactInfo.formatted_identifier,
      valid: !contactInfo.error,
      validationMessage: contactInfo.error,
    };
    const ContactInput = label === 'Email' ? <Input {...inputProps} type="email"/> : <PhoneInput {...inputProps}/>;

    return (
      <div className="additional-contact-info-row"  key={contactInfo.id}>
        <div className="additional-contact-info-row-input">
          {ContactInput}
        </div>
        <div className="additional-contact-info-row-button">
          <Button
            flavor="regular"
            onClick={() => onRemove(contactInfo.id)}
            taste="line">
            <ReactSVG src={MinusIcon}/>
          </Button>
        </div>
      </div>
    );
  });

  const rowValue = (
    <>
      {contactsRender}
      <Button
        className="additional-contact-info-add-button" flavor="regular" onClick={onAddHandler} size="small"
        taste="boundless">
        <ReactSVG className="spacing right__is-5" src={PlusIcon}/>
        <span>Add {label.toLowerCase()} field</span>
      </Button>
    </>
  );

  return <DataRow title={title} value={rowValue}/>;
}

AdditionalContactInfo.propTypes = {
  contactInfos: PropTypes.array,
  label: PropTypes.string,
  onAdd: PropTypes.func,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  title: PropTypes.string,
};