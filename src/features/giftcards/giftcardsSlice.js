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
        printGiftCardsStream: builder.mutation({
            query: (queryArg) => ({
                url: 'gift-cards/sse/print',
                method: 'POST',
                body: { ...queryArg?.data },
                responseHandler: async (response) => {
                    const reader = response.body.getReader();
                    const decoder = new TextDecoder('utf-8');
                    let buffer = '';

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        buffer += decoder.decode(value, { stream: true });

                        let boundary = buffer.indexOf('\n\n');
                        while (boundary !== -1) {
                            const chunk = buffer.slice(0, boundary);
                            buffer = buffer.slice(boundary + 2);

                            if (chunk.startsWith('data: ')) {
                                const jsonString = chunk.slice(6);
                                try {
                                    const jsonChunk = JSON.parse(jsonString);
                                    queryArg.onChunk(jsonChunk);
                                } catch (e) {
                                    console.error('Failed to parse chunk', e, jsonString);
                                }
                            }

                            boundary = buffer.indexOf('\n\n');
                        }
                    }

                    /*   if (buffer.startsWith('data: ')) {
                        const jsonString = buffer.slice(6);
                        try {
                            const jsonChunk = JSON.parse(jsonString);
                            queryArg.onChunk(jsonChunk);
                        } catch (e) {
                            console.error('Failed to parse chunk', e, jsonString);
                        }
                    } */
                },
            }),
        }),
    }),
});

export const {
    useGetGiftCardsQuery,
    useGenerateGiftCardsMutation,
    useCreateVariantMutation,
    useGetVariantsQuery,
    usePrintGiftCardsStreamMutation,
} = giftcardsSlice;
