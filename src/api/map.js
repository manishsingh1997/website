import {ensureUpcomingFeaturesParamInUrl} from '@ergeon/erg-utils-js';
import axios from 'axios';

export const getMapData = async (gid) => {
  const mapDataResponse = await axios({
    method: 'get',
    url: ensureUpcomingFeaturesParamInUrl(
      `${process.env.API_HOST}/api/geo/map/paginated/${gid}/`
    ),
    responseType: 'json',
    headers: {'Content-Type': 'application/json'},
  });

  const firstPage = mapDataResponse.data;

  const { markers: markersPages, polygons: polygonsPages } = firstPage.total_pages;
  const totalPages = markersPages > polygonsPages ? markersPages : polygonsPages;

  const markers = [];
  const polygons = [];

  const { markers: markersInPage, polygons: polygonsInPage } = mapDataResponse.data;
  markers.push(markersInPage);
  polygons.push(polygonsInPage);

  await Promise.all(
    Array.from({
      length: (totalPages - 1) > 0 ? totalPages - 1 : 0
    }).map(async (_, index) => {
      const pageNumber = index + 2
      const { data } = await axios({
        method: 'get',
        url: 
          ensureUpcomingFeaturesParamInUrl(
            `${
              process.env.API_HOST
            }/api/geo/map/paginated/${gid}/?page_number=${
              pageNumber
            }`
          ),
        responseType: 'json',
        headers: {'Content-Type': 'application/json'},
      });
      const { markers: markersInPage, polygons: polygonsInPage } = data;
      markers.push(markersInPage);
      polygons.push(polygonsInPage);
    })
  );

  mapDataResponse.data.markers = markers.flat();
  mapDataResponse.data.polygons = polygons.flat();

  return mapDataResponse;
};
