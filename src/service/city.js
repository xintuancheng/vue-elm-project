import axios from 'axios';
import {basePathV1, basePathV2} from './base';

/**
 * params: type,
 * guess 当前
 * hot  热搜
 * group 所有城市
 * @returns {AxiosPromise<any>}
 */
export const getCityBytype = (type) => {
    return axios.get(`${basePathV1}/cities`, {
        params: {type}
    });
}

/**
 * 根据当前城市的id搜索当前的城市
 * @param city_id
 * @returns {AxiosPromise<any>}
 */
export const getCurrentCityByid = (city_id) => {
    return axios.get(`${basePathV1}/cities/${city_id}`);
}

/**
 * 返回实时的地址
 * @param type
 * @param city_id
 * @param keyword
 * @returns {AxiosPromise<any>}
 */
export const getPois = (type, keyword, city_id) => {
    return axios.get(`${basePathV1}/pois`, {
        params: {
            type,
            city_id,
            keyword
        }
    });
}

