import { apiSlice } from '../../api/apiSlice';

export const banSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBannedAttendees: builder.query({
            query: ({ page, pageSize }) => `admin/blocked-attendees?page=${page}&pageSize=${pageSize}`,
            providesTags: ['ban-attendee'],
        }),
        getBannedOrgs: builder.query({
            query: ({ page, pageSize }) => `admin/blocked-organizations?page=${page}&pageSize=${pageSize}`,
            providesTags: ['ban-orgs'],
        }),
        banAttendee: builder.mutation({
            query: (attendee_id) => ({
                url: `admin/attendee/${attendee_id}`,
                method: 'POST',
            }),
            invalidatesTags: ['ban-attendee', 'attendees'],
        }),

        unBanAttendee: builder.mutation({
            query: (attendee_id) => ({
                url: `admin/attendee/unblock/${attendee_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ban-attendee', 'attendees'],
        }),

        banOrganization: builder.mutation({
            query: (id) => ({
                url: `admin/organization/${id}`,
                method: 'POST',
            }),
            invalidatesTags: ['ban-orgs', 'orgs'],
        }),
        unBanOrganization: builder.mutation({
            query: (id) => ({
                url: `admin/organization/unblock/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ban-orgs', 'orgs'],
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
    useUnBanAttendeeMutation,
    useUnBanOrganizationMutation,
} = banSlice;
