import axios from 'axios';
import {basePath} from './base';
import {getStore} from '../util/util';

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return axios.get(`${basePath}/v1/user`, {
        params: {user_id: getStore('user_id')}
    });
}

export const accountLogin = (username, password, captcha_code) => {
    return axios.post(`${basePath}/v2/login`, {
        username, password, captcha_code
    });
}

export const getCaptchas = () => {
    return axios.post(`${basePath}/v1/captchas`, {});
}