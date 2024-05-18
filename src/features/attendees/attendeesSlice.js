import { apiSlice } from '../../api/apiSlice';

export const attendeesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAttendees: builder.query({
            query: () => `attendee`,
            providesTags: ['attendees'],
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

export const { useGetAttendeesQuery } = attendeesSlice;
