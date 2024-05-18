import { apiSlice } from '../../api/apiSlice';

export const featuredSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFeaturedEvents: builder.query({
            query: () => `featured-events`,
            providesTags: ['featured-events'],
        }),
        getFutureUnfeaturedEvents: builder.query({
            query: (organization_id) => `organization/future-un-featured-events/${organization_id}`,
        }),
        addFeaturedEvent: builder.mutation({
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
        }),
    }),
});

export const {
    useGetFutureUnfeaturedEventsQuery,
    useGetFeaturedEventsQuery,
    useAddFeaturedEventMutation,
    useDeleteFeaturedEventMutation,
} = featuredSlice;
