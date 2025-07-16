import {DOMAIN, ENDPOINT} from '../endpoints.ts';

export const prefetchProducts=  async (limit: number) => {
    try {
        const res = await fetch(`${DOMAIN}${ENDPOINT.PRODUCTS}?limit=${limit}`, {method: 'GET'});
        const result = await res.json();
        return result || [];
    } catch (e) {
        console.error(e);
        return [];
    }
};