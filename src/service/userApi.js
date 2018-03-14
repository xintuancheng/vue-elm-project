import axios from 'axios';
import {basePathV1, basePathV2} from './base';
import {getStore} from '../util/util';

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return axios.get(`${basePathV1}/user`, {
        params: {user_id: getStore('user_id')}
    });
}

export const accountLogin = (username, password, captcha_code) => {
    return axios.post(`${basePathV2}/login`, {
        username, password, captcha_code
    });
}

export const getCaptchas = () => {
    return axios.post(`${basePathV1}/captchas`, {});
}