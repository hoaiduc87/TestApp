import axios from 'axios';
import { GIPHY_ENDPOINT } from 'settings';

export const apiGet = (params) => {
  const { url, path, body } = params;

  const response = axios({
    method: 'get',
    url: url || `${GIPHY_ENDPOINT}${path}`,
    params: body,
  });

  return response;
}
