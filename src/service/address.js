import axios from 'axios';
import {basePath} from './base';

/**
 * 获取msite页面地址信息
 * @param geohash
 * @returns {*}
 */
export const getAddressByGeohash = (geohash) => {
    return axios.get(`${basePath}/v2/pois/${geohash}`);
}