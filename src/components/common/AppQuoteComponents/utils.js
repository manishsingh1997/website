import {getLabelFromIndex} from '@ergeon/draw-map';

export const hideDroppedLabels = (projectCalcInput, quoteLines) => {
  const linesByLabel = {};
  for (const quoteLine of quoteLines) {
    linesByLabel[quoteLine.label] = quoteLine['is_dropped'];
  }

  const newCalcInput = {
    ...projectCalcInput,
    sides: [],
    polygons: [],
    gates: [],
  };
  const calcInputKeys = Object.keys(newCalcInput);
  calcInputKeys.forEach(fieldName => {
    if (!projectCalcInput[fieldName]) {
      return;
    }
    (projectCalcInput[fieldName]).forEach((item, index) => {
      let label;
      if (fieldName === 'sides' || fieldName === 'polygons') {
        label = getLabelFromIndex(index);
      } else {
        label = index.toString();
      }

      const isLabelDropped = linesByLabel[label] === true;
      newCalcInput[fieldName].push({
        ...item,
        'is_dropped': isLabelDropped,
      });
    });
  });

  return newCalcInput;
};
