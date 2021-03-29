import QuoteLinePreview from './QuoteLinePreview';
import {getQuoteLineForCalcInputItem, indexLabel} from './utils';

import {CALC_SIDE_TYPE, CALC_AREA_TYPE, CALC_GATE_TYPE} from '../../../website/constants';

/**
 * Extracts correct quoteLine and returns "side" preview
 * @param {{quote: object, index: string, label: string}} props
 */
const sideType = (props) => {
  const {quote, index, label} = props;
  const quoteLine = getQuoteLineForCalcInputItem(quote['quote_lines'], indexLabel(index, label));
  return QuoteLinePreview({...props, quoteLine});
};

/**
 * Returns "area" preview
 * @param {object} props
 */
const areaType = (props) => {
  return QuoteLinePreview({...props, quoteLine: null, useNoPreviewIcon: false, usePlaceholder: true});
};

/**
 * Extracts correct quoteLine and returns "gate" preview
 * @param {{quote: object, index: string, name: string}} props
 */
const gateType = (props) => {
  const {quote, index, name} = props;
  const quoteLine = getQuoteLineForCalcInputItem(quote['quote_lines'], index + 1);
  const useNoPreviewIcon = name === '!' || name === 'Complications';
  return QuoteLinePreview({...props, quoteLine, useNoPreviewIcon});
};

/**
 * Switches to correct type (CALC_SIDE_TYPE, CALC_AREA_TYPE, CALC_GATE_TYPE || null)
 * @param {{type: string}} props
 */
export default function PreviewForCalcInfo(props) {
  const {type} = props;
  switch (type) {
    case CALC_SIDE_TYPE:
      return sideType(props);
    case CALC_AREA_TYPE:
      return areaType(props);
    case CALC_GATE_TYPE:
      return gateType(props);
    default:
      return null;
  }
}