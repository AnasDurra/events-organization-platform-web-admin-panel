import { apiSlice } from '../../api/apiSlice';

export const orgsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addNewOrg: builder.mutation({
      query: (org) => ({
        url: '/organization',
        method: 'POST',
        body: org,
      }),
    }),
    getOrganizations: builder.query({
      query: () => '/organization',
    }),
  }),
});

export const { useAddNewOrgMutation, useGetOrganizationsQuery } = orgsSlice;
