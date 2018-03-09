import {UserApi} from '../service/index';

const userApi = new UserApi();

export default {
    async getUserInfo({commit, state}) {
        const res = await userApi.getUserInfo();

        commit('GET_USERINFO', res);
    }
}