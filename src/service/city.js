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

