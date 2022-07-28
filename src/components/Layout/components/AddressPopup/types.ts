import {Address} from '../../../types';

export type AddressPopupProps = {
  addressInputLabel?: string;
  disabled: boolean;
  handleAddressChange?: (data: {address: Address}) => void;
  handleAddressSelected: (data: {address: Address}) => void;
  handleAddressSubmit: () => void;
  handleClose: () => void;
  product?: string;
  submitText?: string;
  icon?: string;
  title: string;
  value?: string;
};
