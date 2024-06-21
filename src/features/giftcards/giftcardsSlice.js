import { apiSlice } from '../../api/apiSlice';

export const giftcardsSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGiftCards: builder.query({
            query: () => `gift-cards`,
            providesTags: ['giftcards'],
        }),
        generateGiftCards: builder.mutation({
            query: (body) => ({
                url: 'gift-cards/generate',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['giftcards', 'giftcards-variants'],
        }),
        getVariants: builder.query({
            query: () => `gift-cards/variant`,
            providesTags: ['giftcards-variants'],
        }),
        createVariant: builder.mutation({
            query: (body) => ({
                url: 'gift-cards/variant',
                method: 'POST',
                body: body,
            }),
            invalidatesTags: ['giftcards-variants'],
        }),
    }),
});

export const { useGetGiftCardsQuery, useGenerateGiftCardsMutation, useCreateVariantMutation, useGetVariantsQuery } =
    giftcardsSlice;
