import {Address} from '../../../types';
import {PopUpAction} from './AddressPopup';

export type AddressPopupProps = {
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
