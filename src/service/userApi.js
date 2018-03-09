import Axios from 'axios';

export class UserApi {
    /**
     * 获取用户信息
     */
    getUserInfo = () => {
        return new Promise((resolve) => {
            resolve({
                username: 'xiaozhang',
                message: ''
            })
        });
    }
}