import { apiSlice } from '../../api/apiSlice';

export const banSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBannedAttendees: builder.query({
            query: ({ page, pageSize }) => `admin/blocked-attendees?page=${page}&pageSize=${pageSize}`,
            providesTags: ['ban-attendee'],
        }),
        getBannedOrgs: builder.query({
            query: ({ page, pageSize }) => `admin/blocked-organizations?page=${page}&pageSize=${pageSize}`,
            providesTags: ['ban-attendee'],
        }),
        banAttendee: builder.mutation({
            query: (id) => ({
                url: `admin/attendee/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['ban-attendee'],
        }),
        banOrganization: builder.mutation({
            query: (id) => ({
                url: `admin/organization/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['ban-orgs'],
        }),
    }),
});

export const {
    useBanAttendeeMutation,
    useBanOrganizationMutation,
    useGetBannedAttendeesQuery,
    useGetBannedOrgsQuery,
    useLazyGetBannedAttendeesQuery,
    useLazyGetBannedOrgsQuery,
} = banSlice;
