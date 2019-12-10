import {snapshot} from '@ergeon/3d-lib';
import config from 'website/config';

export const parseError = (error) => {
  try {
    const json = JSON.parse(error.responseText);

    for (const key in json) {
      const value = json[key];
      return `${Array.isArray(value) ? value[0] : value }: '${key}'`;
    }
  } catch (e) {
    return error.statusText;
  }
};

export const findComponentByTypes = (place, types) => {
  for (let i = 0; i < place.address_components.length; i++) {
    const component = place.address_components[i];
    for (let j = 0; j < types.length; j++) {
      if (component.types.indexOf(types[j]) !== -1) {
        return component;
      }
    }
  }
  return null;
};

export const isFenceAvailable = (lead) => {
  if (lead && lead.available_products && Array.isArray(lead.available_products)) {
    return lead.available_products.indexOf(config.FENCE_REPLACEMENT) !== -1;
  }
};

export const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${ name }(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const isObject = (value) => {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
};

export const getPreviewImage = (data) => {
  const imgData = snapshot.getFrontImgDataURL(120, 120, data, [], []);
  return imgData.then(data => {
    return data;
  });
};
