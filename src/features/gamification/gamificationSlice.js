import { apiSlice } from '../../api/apiSlice';

export const gamificationSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBadges: builder.query({
            query: () => `gamification/rewards/badges`,
            providesTags: ['badges'],
        }),
        addBadge: builder.mutation({
            query: (body) => ({
                url: 'gamification/rewards/badges',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['badges'],
        }),
        updateBadge: builder.mutation({
            query: (body) => ({
                url: 'gamification/rewards/badges',
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['badges'],
        }),

        getPoints: builder.query({
            query: () => `gamification/rewards/points`,
            providesTags: ['points'],
        }),
        addPoints: builder.mutation({
            query: (body) => ({
                url: 'gamification/rewards/points',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['points'],
        }),

        getRedeemablePoints: builder.query({
            query: () => `gamification/rewards/redeemable-points`,
            providesTags: ['points-rp'],
        }),
        addRedeemablePoints: builder.mutation({
            query: (body) => ({
                url: 'gamification/rewards/redeemable-points',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['points-rp'],
        }),

        getDefinedData: builder.query({
            query: () => `gamification/defined-data`,
        }),
        getRules: builder.query({
            query: () => `gamification/rules`,
            providesTags: ['rules'],
        }),
        addRule: builder.mutation({
            query: (body) => ({
                url: 'gamification/rules',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['rules'],
        }),
        updateRule: builder.mutation({
            query: (body) => ({
                url: 'gamification/rules',
                method: 'PUT',
                body: body,
            }),
            invalidatesTags: ['rules'],
        }),

        /*   addFeaturedEvent: builder.mutation({
            query: (body) => ({
                url: 'featured-events',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['featured-events'],
        }),
        deleteFeaturedEvent: builder.mutation({
            query: (event_id) => ({
                url: `featured-events/${event_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['featured-events'],
        }), */
    }),
});

export const {
    useGetPointsQuery,
    useGetBadgesQuery,
    useAddBadgeMutation,
    useUpdateBadgeMutation,
    useAddPointsMutation,
    useAddRedeemablePointsMutation,
    useGetDefinedDataQuery,
    useAddRuleMutation,
    useUpdateRuleMutation,
    useGetRulesQuery,
    useGetRedeemablePointsQuery,
} = gamificationSlice;
