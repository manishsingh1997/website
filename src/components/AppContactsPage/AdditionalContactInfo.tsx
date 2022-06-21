import React, {ChangeEvent, MouseEvent, useCallback, useMemo} from 'react';
import {ReactSVG} from 'react-svg';
import classnames from 'classnames';
import {Input, PhoneInput, Button} from '@ergeon/core-components';

import MinusIcon from '@ergeon/core-components/src/assets/icon-minus.svg';
import PlusIcon from '@ergeon/core-components/src/assets/icon-plus.svg';

import DataRow from '../common/DataRow';
import {PrimaryContact} from './types';

type AdditionalContactInfoProps = {
  title: string;
  label: string;
  contactInfos: PrimaryContact[];
  onAdd(label: string): void;
  onRemove(id: number): void;
  onChange(event: ChangeEvent<HTMLInputElement>, name: string, value: string): void;
};

const AdditionalContactInfo = (props: AdditionalContactInfoProps) => {
  const {title, label, contactInfos, onAdd, onRemove, onChange} = props;
  
  const onAddHandler = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      onAdd(label);
    }, [onAdd, label]);

  const contactsRender = useMemo(() => {
    return contactInfos.map((contactInfo, index) => {
    const inputProps = {
      label,
      onChange,
      pk: contactInfo.id,
      value: contactInfo.formatted_identifier,
      isValid: !contactInfo.error,
      validationMessage: contactInfo.error,
      'data-testid': `${label.toLocaleLowerCase()}-input`,
    };

    const ContactInput = label === 'Email' ? <Input {...inputProps} type="email" /> : <PhoneInput {...inputProps} />;
    const classes = classnames('additional-contact-info-row', {
      'additional-contact-info-row_last': index === contactInfos.length - 1,
    });
    const buttonClasses = classnames({
      [`remove-${label}`]: label,
    });

    return (
      <div className={classes} key={contactInfo.id}>
        <div className="additional-contact-info-row-input">{ContactInput}</div>
        <div className="additional-contact-info-row-button">
          <Button className={buttonClasses} flavor="regular" onClick={() => onRemove(contactInfo.id)} taste="line">
            <ReactSVG src={MinusIcon} />
          </Button>
        </div>
      </div>
    );
  })
},[label, onChange, contactInfos])

  const rowValue = useMemo(() => {
    return (
      <>
        {contactsRender}
        <a className="additional-contact-info-add-button" onClick={onAddHandler}>
          <ReactSVG className="spacing right__is-5" src={PlusIcon} />
          <span>Add {label.toLowerCase()} field</span>
        </a>
      </>
    );
  }, [onAddHandler, label]);

  const classes = useMemo(() => {
    return classnames({'additional-contacts-empty': contactInfos.length === 0});
  }, [contactInfos]);

  return (
    <div className={classes}>
      <DataRow title={title} value={rowValue} />
    </div>
  );
};

export default AdditionalContactInfo;
