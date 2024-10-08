import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from './constants';
import Cookies from 'js-cookie';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        credentials: 'same-origin',
        baseUrl: URL,
        prepareHeaders: (headers) => {
            const token = Cookies.get('accessToken');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            headers.set('ngrok-skip-browser-warning', true); // TODO: Delete this
            return headers;
        },
    }),
    tagTypes: [
        'ticketing-packages',
        'featured-events',
        'attendees',
        'ban-orgs',
        'ban-attendee',
        'orgs',
        'badges',
        'rules',
        'points',
        'points-rp',
        'prizes',
        'withdraws',
        'giftcards',
        'giftcards-variants',
    ],
    endpoints: () => ({}),
});
