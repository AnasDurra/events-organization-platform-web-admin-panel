import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { apiSlice } from '../api/apiSlice';

export const auth = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (responseData) => {
                Cookies.remove('user', { path: '/' });
                Cookies.remove('accessToken', { path: '/' });
                Cookies.remove('refreshToken', { path: '/' });

                Cookies.set('user', JSON.stringify(responseData?.result), {
                    expires: 12,
                    path: '/',
                });
                Cookies.set('accessToken', responseData?.result?.access_token, {
                    expires: 12,
                    path: '/',
                });
                Cookies.set('refreshToken', responseData?.result?.refresh_token, {
                    expires: 12,
                    path: '/',
                });
                return responseData;
            },
        }),

        checkAccessToken: builder.query({
            query: () => ({
                url: 'user/exchange',
                method: 'GET',
            }),
        }),
        updateUsernameOrEmail: builder.mutation({
            query: (body) => ({
                url: 'auth/update-username-or-email',
                method: 'POST',
                body,
            }),
        }),
        updatePassword: builder.mutation({
            query: (body) => ({
                url: 'auth/change-password',
                method: 'POST',
                body,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),
        }),

        refresh: builder.query({
            query: (refresh_token) => ({
                url: 'attendee/refresh-token',
                method: 'GET',
                headers: { Authorization: `Bearer ${refresh_token}` },
                // body: refresh_token,
            }),
        }),

        userMenu: builder.query({
            query: () => ({
                url: 'user/menu',
                method: 'GET',
            }),
        }),
    }),
});

export const getLoggedInUser = () => {
    const token = Cookies.get('accessToken');
    const decodedToken = jwtDecode(token);

    return decodedToken;
};

export const getLoggedInUserV2 = () => {
    if (Cookies.get('user')) return JSON.parse(Cookies.get('user'));
    else return null;
};

export const {
    useLoginMutation,
    useLogoutMutation,
    useUserMenuQuery,
    useCheckAccessTokenQuery,
    useUpdateUsernameOrEmailMutation,
    useUpdatePasswordMutation,
} = auth;
