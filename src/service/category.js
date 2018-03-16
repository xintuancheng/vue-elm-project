import axios from 'axios';
import {basePath} from './base';

/**
 * 获取msite页面食品分类列表
 * @param geohash
 * @returns {*}
 */
export const msiteFoodTypes = (geohash) => {
    return axios.get(`${basePath}/v2/index_entry`, {
        params: {
            geohash,
            group_type: 1,
            'flags[]': 'F'
        }
    });
}