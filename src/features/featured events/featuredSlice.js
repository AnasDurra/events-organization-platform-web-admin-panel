import { apiSlice } from '../../api/apiSlice';

export const featuredSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFutureUnfeaturedEvents: builder.query({
            query: (organization_id) => `/future-un-featured-events/${organization_id}`,
        }),
    }),
});

export const { useGetFutureUnfeaturedEventsQuery } = featuredSlice;
