import {DOMAIN, ENDPOINT} from '../endpoints.ts';

export const prefetchProducts=  async (limit: number) => {
    try {
        return await fetch(`${DOMAIN}${ENDPOINT.PRODUCTS}?limit=${limit}`, {method: 'GET'}).then(res => res.json());
    } catch (e) {
        console.error(e);
        return [];
    }
};