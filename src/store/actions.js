import {getUserInfo, getCityBytype} from '../service/index';

export default {
    async getUserInfo({commit, state}) {
        const res = await getUserInfo();

        commit('GET_USERINFO', res);
    }
}