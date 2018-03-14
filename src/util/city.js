import {getStore, setStore} from './util';
import {getCityBytype} from '../service/index';

export const getCitys = async () => {
    const cityName = 'CITY_GROUP';
    const citys = getStore(cityName);

    if (citys) {
        return JSON.parse(citys);
    } else {
        const res = await getCityBytype('group');
        const data = res.data;
        setStore(cityName, JSON.stringify(data));
        return data;
    }
}

