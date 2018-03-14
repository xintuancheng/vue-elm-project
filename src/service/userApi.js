import axios from 'axios';
import {basePathV1, basePathV2} from './base';

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
    return axios.get(`${basePathV1}/user`, {
        params: {
            user_id: '4941'
        }
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