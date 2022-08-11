import {constants, calcUtils, CatalogType} from '@ergeon/3d-lib';
import {getAdvancedEditorUrl} from '../../../utils/utils';
import {Address} from '../utils';
import {Config} from './types';

type Lead = {
  address?: Address;
};

export const getOrder = (configs: Config[], lead: Lead) => {
  const {CATALOG_ID_FENCE, CATALOG_ID_GATE} = constants;
  const {address} = lead;

  return configs.map((item: Config) => {
    const schema = (calcUtils.getParams(`?${item.code}`).schema as string).split(',');
    const schemaNumber = schema.map((number: string) => number);
    const code = (calcUtils.getParams(`?${item.code}`).code as string).split(',');
    return {
      advancedEditorUrl: getAdvancedEditorUrl(
        {schema: schemaNumber, code, catalog_type: item.catalog_type},
        address?.zipcode
      ),
      catalog_type: item.catalog_type,
      catalog_id: item.catalog_type === CatalogType.FENCE ? CATALOG_ID_FENCE : CATALOG_ID_GATE,
      schema: schemaNumber,
      code,
      description: item.description,
      price: item.price,
      units: item.units,
      grade: item.grade,
    };
  });
};

export const isMinimumValidAddress = (value: Address | undefined) => {
  return Boolean(value && typeof value === 'object' && value['city_name'] && value['state_abbreviation']);
};
