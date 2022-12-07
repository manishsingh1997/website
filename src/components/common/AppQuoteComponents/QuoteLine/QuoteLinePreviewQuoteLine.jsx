import {CALC_GATE_TYPE, CALC_SIDE_TYPE} from 'website/constants';

import QuoteLinePreview from './QuoteLinePreview';

/**
 * Returns "side" type quoteline
 * @param {{quote: object, label:string}} props
 */
const sideType = (props) => {
  return QuoteLinePreview(props);
};

/**
 * Returns "gate" type quoteline
 * @param {{quote: object, label: string, name: string}} props
 */
const gateType = (props) => {
  const {name} = props;
  const useNoPreviewIcon = name === '!' || name === 'Complications';
  return QuoteLinePreview({...props, useNoPreviewIcon});
};

/**
 * Switches to correct type (CALC_SIDE_TYPE, CALC_GATE_TYPE || null)
 * @param {{type: string}} props
 */
export default function PreviewForQuoteLine(props) {
  const {type} = props;
  switch (type) {
    case CALC_SIDE_TYPE:
      return sideType(props);
    case CALC_GATE_TYPE:
      return gateType(props);
    default:
      return null;
  }
}
