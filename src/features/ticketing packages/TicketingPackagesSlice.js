import { apiSlice } from '../../api/apiSlice';

export const ticketingPackagesSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPackages: builder.query({
            query: () => '/payment/packages',
            providesTags: ['ticketing-packages'],
        }),
        addNewPackage: builder.mutation({
            query: (body) => ({
                url: '/payment/packages/create',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['ticketing-packages'],
        }),
        addPriceToPackage: builder.mutation({
            query: (body) => ({
                url: '/payment/packages/addPrice',
                method: 'POST',
                body: body,
            }),
        }),
        updatePackage: builder.mutation({
            query: (body) => ({
                url: 'payment/packages/update',
                method: 'PATCH',
                body: body,
            }),
            invalidatesTags: ['ticketing-packages'],
        }),
    }),
});

export const { useAddNewPackageMutation, useUpdatePackageMutation, useGetPackagesQuery, useAddPriceToPackageMutation } =
    ticketingPackagesSlice;
