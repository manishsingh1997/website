import {Address} from '../../../types';

import {PopUpAction} from './AddressPopup';

export type PopupContentProps = {
  actionType: PopUpAction;
  addressInputLabel?: string;
  disabled: boolean;
  handleAddressChange?: (data: {address: Address}) => void;
  handleAddressSelected: (data: {address: Address}) => void;
  handleAddressSubmit: () => void;
  handleClose: () => void;
  product?: string;
  icon?: string;
  value?: string;
};

export type AddressPopupProps = {
  confirmationMessage?: string | JSX.Element;
} & PopupContentProps;

export type ConfirmationProps = {
  message?: string | JSX.Element;
};
