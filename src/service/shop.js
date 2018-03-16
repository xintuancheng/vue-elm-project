import axios from 'axios';
import {basePath} from './base';

/**
 * 获取msite商铺列表
 */
export const shopList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
    let supportStr = '';

    support_ids.forEach((item) => {
        if (item.status) {
            supportStr += '&support_ids[]=' + item.id;
        }
    });

    let data = {
        latitude,
        longitude,
        offset,
        limit: '20',
        'extras[]': 'activities',
        keyword: '',
        restaurant_category_id,
        'restaurant_category_ids[]': restaurant_category_ids,
        order_by,
        'delivery_mode[]': delivery_mode + supportStr
    };

    return axios.get(`${basePath}/shopping/restaurants`, {
        params: data
    })
}